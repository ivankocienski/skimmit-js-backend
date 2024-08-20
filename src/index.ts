import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import * as config from './Config';
import * as db from './database';

const app = express();

app.locals = require('./viewHelpers');

app.set('view engine', 'pug');

const viewsDir = path.join(__dirname, 'views');
console.log("viewsDir=", viewsDir);
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
console.log("staticDir=", staticDir);
app.use(express.static(staticDir));

app.use( bodyParser.urlencoded({ extended: false }) );

// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1006086291
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

//
//
//

app.get('/', async (req, res) => {
  const dbClient = app.get('dbClient');

  const postCount = await db.countPosts(dbClient);

  const posts = await db.findAllPosts(dbClient);

  res.render('index', { postCount: postCount, posts: posts });
});

app.post('/posts/read', async (req, res) => {
  const dbClient = app.get('dbClient');
  const post_id: number = parseInt(req.body.post_id, 10);

  const success = await db.markPostAsRead(dbClient, post_id);

  if(success) {
    res.redirect('/');
    return;
  }

  res.send(`Not updated`);
});

app.get('/api/v1/posts', async (req, res) => {
  const dbClient = app.get('dbClient');

  const postCount = await db.countPosts(dbClient);

  const posts = await db.findAllPosts(dbClient);

  const payload = {
    count: postCount,
    posts: posts
  };

  res.send(payload);
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