const http = require('http');
const app = require('./backend/app')


const server = http.createServer((requast, response) => {

    response.end("res");
});

server.listen(process.env.PORT || 3000);