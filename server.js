const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
  target: 'https://deadshot.io',
  changeOrigin: true,
  ws: true,
  on: {
    error: (err, req, res) => {
      res.status(500).send('Proxy error');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
