// =============================================
// I AM A RECRUITER — Google Apps Script
// Handles form submissions:
// 1. Writes to Master tab in Google Sheets
// 2. Sends email notification to iamarecruitercommunity@gmail.com
//
// SETUP INSTRUCTIONS (one time):
// 1. Open Google Apps Script: script.google.com
// 2. Create a new project, paste this code
// 3. Click Deploy > New deployment > Web app
// 4. Execute as: Me | Who has access: Anyone
// 5. Copy the Web App URL
// 6. Paste it in joinus.html where it says YOUR_APPS_SCRIPT_URL_HERE
// =============================================

const SHEET_ID    = '1T5GUZqQlIPIL_cOgiBrhJtzkzL1u4H7hK6ZB5zsAP6I';
const SHEET_NAME  = 'Master';
const NOTIFY_EMAIL = 'iamarecruitercommunity@gmail.com';

function doPost(e) {
  try {
    const raw  = e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    // --- Write to Google Sheet ---
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Match exact column order from the Master tab headers:
    // Name | Email ID: | Phone - Mobile | Job Title | Current Company / Organisation Name | Your Current Location | Your LinkedIn Profile URL
    sheet.appendRow([
      data.name     || '',
      data.email    || '',
      data.phone    || '',
      data.jobTitle || '',
      data.company  || '',
      data.location || '',
      data.linkedin || ''
    ]);

    // --- Send email notification ---
    const now     = new Date();
    const timeIST = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const subject = 'New IAAR Member: ' + (data.name || 'Unknown') +
                    ' from ' + (data.company || 'Unknown');

    const body =
      'New member has joined I AM A RECRUITER Community!\n\n' +
      '──────────────────────────────\n' +
      'Name:      ' + (data.name     || '—') + '\n' +
      'Email:     ' + (data.email    || '—') + '\n' +
      'Phone:     ' + (data.phone    || '—') + '\n' +
      'Job Title: ' + (data.jobTitle || '—') + '\n' +
      'Company:   ' + (data.company  || '—') + '\n' +
      'Location:  ' + (data.location || '—') + '\n' +
      'LinkedIn:  ' + (data.linkedin || '—') + '\n' +
      (data.interests ? 'Interests: ' + data.interests + '\n' : '') +
      (data.referrer  ? 'Referred by: ' + data.referrer + '\n' : '') +
      '──────────────────────────────\n' +
      'Submitted: ' + timeIST + '\n\n' +
      'View in Google Sheets:\n' +
      'https://docs.google.com/spreadsheets/d/' + SHEET_ID;

    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('IAAR Form Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — visit the URL in a browser to confirm deployment works
function doGet(e) {
  return ContentService
    .createTextOutput('IAAR Form Handler is live and running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
