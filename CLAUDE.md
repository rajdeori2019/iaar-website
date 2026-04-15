# I AM A RECRUITER (IAAR) — Website

## Project Overview
Community website for I AM A RECRUITER — India's premier Talent Acquisition community. Rebuilt from Wix to a static HTML/CSS/JS site hosted on Railway.

## Live URLs
- **Production:** https://iaar-website-production.up.railway.app
- **Custom Domain:** www.iamarecruiter.in (via BigRock DNS)
- **GitHub:** https://github.com/rajdeori2019/iaar-website

## Project Structure
```
iaar-website/
├── CLAUDE.md
├── server.js              # Express static file server
├── package.json
├── public/
│   ├── index.html         # Home page
│   ├── mentorship.html    # Mentorship page
│   ├── blog.html          # IAAR Blogs page
│   ├── events.html        # Events page
│   ├── joinus.html        # Join Us form page
│   ├── css/
│   │   └── style.css      # All styles (shared across all pages)
│   └── js/
│       └── main.js        # Scroll animations, mobile menu, form handler
└── apps-script/
    └── Code.gs            # Google Apps Script for form → Sheets + email
```

## Tech Stack
- **Frontend:** Pure HTML, CSS, JavaScript (no framework)
- **Server:** Node.js + Express (serves static files)
- **Hosting:** Railway
- **Domain:** BigRock (iamarecruiter.in)
- **Form backend:** Google Apps Script Web App

## Design System
- **Theme:** Purple + Amber — warm, community-driven
- **Primary:** `#5B21B6` (purple)
- **Dark:** `#3B0764` (purple-dark)
- **Accent:** `#F59E0B` (amber — CTAs, highlights)
- **Background:** `#FDFCFF` (warm white)
- **Fonts:** Poppins (headings, 800 weight) + DM Sans (body)
- **Radius:** 12px (cards), 20px (large cards)
- **Logo:** CSS recreation — "I AM A" white on purple block + "RECRUITER™" in purple on white

## Pages
| Page | File | Route |
|------|------|-------|
| Home | index.html | `/` |
| Mentorship | mentorship.html | `/mentorship` |
| IAAR Blogs | blog.html | `/blog` |
| Events | events.html | `/events` |
| Join Us | joinus.html | `/joinus` |

## Form Integration (Join Us page)
- **Google Sheet:** https://docs.google.com/spreadsheets/d/1T5GUZqQlIPIL_cOgiBrhJtzkzL1u4H7hK6ZB5zsAP6I
- **Sheet Tab:** Master
- **Columns:** Name | Email ID | Phone - Mobile | Job Title | Current Company / Organisation Name | Your Current Location | Your LinkedIn Profile URL
- **Apps Script URL:** https://script.google.com/macros/s/AKfycbw1wrKMVmoIvIH5ZV3kSKQr00h10LSZjkOraVSru1VZoHJ_KXtgfBKLLPMENGljYAyB/exec
- **Notification email:** iamarecruitercommunity@gmail.com
- **Script location in joinus.html:** `window.APPS_SCRIPT_URL = '...'` in `<head>`

## Deploy Workflow
```bash
# Make changes, then:
git add .
git commit -m "description of change"
git push
railway up --detach --service iaar-website
```

## DNS Configuration (BigRock)
| Type | Host | Value |
|------|------|-------|
| CNAME | www | fxvlfrpr.up.railway.app |
| A | @ | 151.101.2.15 |
| TXT | _railway-verify.www | railway-verify=fc27475d135c26db40520ff1058de99a3f28d2581caa4d340ac2131c4b0456ec |

## Railway Details
- **Project ID:** 3d68709b-8927-4e2b-8ce8-f7b31efa7290
- **Service ID:** fd0b403a-4297-49b8-aad5-bfbd7a8553dc
- **Service name:** iaar-website

## Contact & Brand
- **Email:** hello@iamarecruiter.in
- **Community email:** iamarecruitercommunity@gmail.com
- **Location:** Bangalore, India
- **Co-Founders:** Prafulla Deori, Niharika Naidu, Bharathi Vijayappa

## Things to Update Later
- Social media links in footer (LinkedIn, WhatsApp, YouTube, Instagram, Facebook) — currently pointing to generic URLs, need real IAAR profile URLs
- Blog post links — currently pointing to Wix blog, migrate when content is ready
- Mentor profiles — use real names/photos when available
