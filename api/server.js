import http from 'node:http';

const server = http.createServer((req, res) => {
  const requirements = {
    name: 'required',
    email: 'required',
    phone: 'optional',
    project_type: 'required',
    project_description: 'optional',
    budget_min: 'required',
    budget_max: 'required',
  };

  const headers = {
    'Access-Control-Allow-Origin': process.env.VITE_FRONTEND_URL ?? '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  let data = [];
  let body = '';

  req.on('data', (chunk) => {
    data.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(data).toString();
    res.end(body);
  });

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    res.writeHead(200, { ...headers, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(requirements));
  }

  if (req.method === 'POST') {
    res.writeHead(200, { ...headers, 'Content-Type': 'application/json' });
  }
});

if (!process.env.VITE_FRONTEND_URL) {
  server.listen(3000, () => {
    console.log('Server is working on port 3000');
  });
}

export default server;
