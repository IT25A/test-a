const http = require('http');
const dotenv = require('dotenv');

dotenv.config();
const MESSAGE_SUFFIX = process.env.MESSAGE_SUFFIX || 'This is Test B';

const MESSAGE = `Greetings, ${MESSAGE_SUFFIX} | PR 21`;

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
