const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
  target: 'https://silvergames.com',
  changeOrigin: true,
  ws: true,
  autoRewrite: true,
  protocolRewrite: 'https',
  cookieDomainRewrite: '',
  headers: {
    'X-Forwarded-Host': 'silvergames.com'
  },
  on: {
    error: (err, req, res) => {
      res.status(500).send('Proxy error');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
