const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { createServer, MESSAGE } = require('./index');

test('server returns expected hello message', async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));

  const { port } = server.address();

  try {
    const body = await new Promise((resolve, reject) => {
      http
        .get(`http://127.0.0.1:${port}`, (res) => {
          let data = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => resolve(data));
        })
        .on('error', reject);
    });

    assert.equal(body, MESSAGE);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
