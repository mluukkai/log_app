const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('process.env.MESSAGE', process.env.MESSAGE);
  res.send('root');
});

app.get('/healthz',async  (req, res) => {
  const url = 'http://pingpong-svc:2344/healthz';
  const response = await axios.get(url);
  if (response.status === 200) {
    res.status(200).send('Service is healthy');
  } else {
    res.status(500).send('Service is not healthy');
  }
});

app.get('/status', async (req, res) => {
  const random = fs.readFileSync('data/output.txt');
  const url = 'http://pingpong-svc:2344/pongs';
  const response = await axios.get(url);
  const pongs = response.data.count;

  const configFileContents = fs.readFileSync('/app/config/file', 'utf8');

  res.send(`
    ${random}<br>
    Ping / Pongs: ${pongs}<br>
    env-variavle: MESSAGE=${process.env.MESSAGE}<br>
    file ontents: ${configFileContents}`
  );
});

app.use((req, res) => {
  res.status(404).send('404 Not Found (log app)');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});