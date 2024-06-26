import path from 'path';
import express from 'express';
import * as config from './Config';

const app = express();

app.set('view engine', 'pug');

const viewsDir = path.join(__dirname, 'views');
console.log("viewsDir=", viewsDir);
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
console.log("staticDir=", staticDir);
app.use(express.static(staticDir));

app.get('/', (req, res) => {
  res.render('index');
});

app.use((_req, res, _next) => {
  res.status(404).render('not_found');
});

app.listen(config.serverPort(), () => {
  console.log(`Server running on port ${config.serverPort()}`);
});