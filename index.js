const http = require('http');

const MESSAGE = 'Hello World, This is Test A';

function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(MESSAGE);
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, () => {
    process.stdout.write(`Server running on port ${port}\n`);
  });
}

module.exports = { createServer, MESSAGE };
