const http = require('http');
const server = http.createServer(function (req, res) {
    let body = [];
    req.on('error', err => {
        console.log(err);
    }).on('data', chunk => {
        body.push(chunk.toString());
    }).on('end', () => {
        // body = Buffer.concat(body).toString();
        console.log(body);
        res.writeHeader(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end("Hello,world！");
    })
});
server.listen(3000);