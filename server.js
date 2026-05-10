const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const TARGET = 'https://silvergames.com';

app.get('*', async (req, res) => {
  try {
    const url = TARGET + req.path + (req.search || '');
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': req.headers['accept'] || '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    const contentType = response.headers.get('content-type') || '';
    res.setHeader('content-type', contentType);

    if (contentType.includes('text/html')) {
      let body = await response.text();
      // Rewrite all silvergames URLs to go through our proxy
      body = body.replace(/https:\/\/silvergames\.com/g, '');
      res.send(body);
    } else {
      response.body.pipe(res);
    }
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
