import * as config from './Config';
import * as reddit from './reddit';
import * as database from './database';

// a small script that ties together (fetching and) parsing of post data and saving to DB

async function main() {
  const client = await database.connect(config.dbConfig());

  const posts = await reddit.parseData();

  posts.forEach( async post => {
    const result = await database.createPost(client, post);
    console.log("result=", result);
  });
}

main();