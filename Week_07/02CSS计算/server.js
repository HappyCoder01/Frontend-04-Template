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
        res.end(`<html maaa="a">
<head>
    <style>
        body div #myid{
            width: 100px;
            background-color: #ff5000;
        }
        body div img{
            width: 30px;
            background-color: #ff1111;
        }
    </style>
</head>
<body>
    <div>
        <img id="myid" />
        <img />
    </div>
</body>
</html>`);
    })
});
server.listen(3000);