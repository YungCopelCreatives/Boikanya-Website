const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '.')));

// Handle clean URLs or fallback to 404
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const cleanPath = req.path.replace(/\/$/, '');
    const possibleFile = path.join(__dirname, cleanPath + '.html');
    res.sendFile(possibleFile, (err) => {
      if (err) {
        const notFoundFile = path.join(__dirname, '404.html');
        res.status(404).sendFile(notFoundFile, (err404) => {
          if (err404) {
            res.status(404).send('Page Not Found');
          }
        });
      }
    });
  } else {
    next();
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
