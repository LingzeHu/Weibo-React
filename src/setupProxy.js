const { createProxyMiddleware } = require('http-proxy-middleware');

function onProxyReq(proxyReq, req, res) {
    if ( req.url.indexOf('/2/comments/create.json')) {
        proxyReq.setHeader('content-type', 'application/x-www-form-urlencoded')
    }
}

module.exports = function(app) {
    app.use(
        '/proxy',
        createProxyMiddleware({
            // target: 'https://api.weibo.com',
            target: 'http://mock.don.red/weibo',
            pathRewrite: {'/proxy': '/'},
            changeOrigin: true,
            onProxyReq,
        })
    )
}