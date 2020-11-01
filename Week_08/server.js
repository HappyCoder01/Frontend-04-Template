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
        #container{
            width: 500px;
            height: 300px;
            display: flex;
            background-color: rgb(255,255,255);
        }
        #container #myid{
            width: 200px;
            height: 100px;
            background-color: rgb(255,0,0);
        }
        #container .c1{
            flex: 1;
            background-color: rgb(0,255,0);
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="myid" />
        <div class="c1" />
    </div>
</body>
</html>`);
    })
});
server.listen(3000);