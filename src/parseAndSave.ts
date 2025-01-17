import * as config from './Config';
import * as reddit from './reddit';
import * as database from './database';

// a small script that ties together (fetching and) parsing of post data and saving to DB

async function main() {
  const client = await database.connect(config.dbConfig());

  const posts = await reddit.downloadReddit('unitedkingdom');

  posts.forEach( async post => {
    const redditId: string = post.reddit_id || '';

    if(redditId.length > 0) {
      // FIXME: these should be in a transaction
      const alreadyExists = await database.doesPostWithRedditIdExist(client, redditId);

      if(alreadyExists) {
        console.log(`${redditId}: already exists, skipping`);

      } else {
        const result = await database.createPost(client, post);
        console.log(`${redditId}: saved.`);
      }
    }
  });
}

// main();

/* async function pokeUpdater() {
  const client = await database.connect(config.dbConfig());

  try {
    const okay = await database.markPostAsRead(client, 10);

    if(okay) {
      console.log("post updated!");
    } else {
      console.log("something went wrong");
    }

  } catch(err) {
    console.error(err);
  }
} */

// pokeUpdater();

