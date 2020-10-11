class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.path = options.path || '/';
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body);
        else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');

        this.headers['Content-Length'] = this.bodyText.length;
    }

    send() {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            resolve('');
        })
    }
}

class ResponseParser {
    constructor() {
    }

    receive(str) {
        for (let i = 0; i < str.length; i++) {
            this.receiveChar(str.charAt(i));
        }
    }

    receiveChar(char) {

    }
}

void async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 3000,
        path: '/',
        headers: {
            ['X-Foo2']: 'custom'
        },
        body: {
            name: 'blake.li'
        }
    });
    let response = await request.send();
    console.log(response);
}();