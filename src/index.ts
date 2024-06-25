import express from 'express';
import * as config from './Config';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: "Hello there "});
});

app.listen(config.serverPort(), () => {
  console.log(`Server running on port ${config.serverPort()}`);
});