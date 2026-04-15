const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/mentorship', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mentorship.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'public', 'blog.html')));
app.get('/events', (req, res) => res.sendFile(path.join(__dirname, 'public', 'events.html')));
app.get('/joinus', (req, res) => res.sendFile(path.join(__dirname, 'public', 'joinus.html')));

app.listen(PORT, () => console.log(`IAAR running on port ${PORT}`));
