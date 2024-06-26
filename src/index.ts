import path from 'path';
import express from 'express';
import * as config from './Config';
import * as db from './database';

const app = express();

app.set('view engine', 'pug');

const viewsDir = path.join(__dirname, 'views');
console.log("viewsDir=", viewsDir);
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
console.log("staticDir=", staticDir);
app.use(express.static(staticDir));

app.get('/', async (req, res) => {
  const dbClient = app.get('dbClient');

  const postCount = await db.countPosts(dbClient);

  const posts = await db.findAllPosts(dbClient);

  res.render('index', { postCount: postCount, posts: posts });
});

app.use((_req, res, _next) => {
  res.status(404).render('not_found');
});

async function main() {
  const dbClient = await db.connect(config.dbConfig());

  app.set('dbClient', dbClient);

  app.listen(config.serverPort(), () => {
    console.log(`Server running on port ${config.serverPort()}`);
  });
}

main();