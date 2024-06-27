import * as pg from 'ts-postgres';
import { Post, DbConfig } from './Types';

interface InsertQueryReducer {
  queryFieldNames: string[],
  queryValuePositions: string[],
  queryValues: string[],
  valueCount: number
}

interface InsertQueryOutput {
  sql: string,
  queryValues: any[]
}

export async function createPost(client: pg.Client, fields: Post): Promise<any> {

  let buildQuery = function(fieldsRecord: Record<string, any>, fieldNames: string[]): InsertQueryOutput {

    const emptyReducer = {
      queryFieldNames: [],
      queryValuePositions: [],
      queryValues: [],
      valueCount: 0
    };

    let fieldReducer = (soFar: InsertQueryReducer, fieldName: string): InsertQueryReducer => {
      if(fieldName in fieldsRecord) {
        soFar.valueCount++;
        soFar.queryFieldNames.push(fieldName);
        soFar.queryValuePositions.push(`$${soFar.valueCount}`);
        soFar.queryValues.push(fieldsRecord[fieldName]);
      }

      return soFar;
    };

    const { queryFieldNames, queryValuePositions, queryValues, valueCount } =
      fieldNames.reduce<InsertQueryReducer>(fieldReducer, emptyReducer);

    if( valueCount < 1) {
      throw "no values";
    }

    return {
      sql: `insert into posts (${queryFieldNames.join(', ')}) values (${queryValuePositions.join(', ')}) returning id`,
      queryValues: queryValues
    };
  };

  let { sql, queryValues } = buildQuery(
    fields as Record<string, any>,
    [ "reddit_id", "title", "link", "sub_reddit", "date_posted", "have_read" ]
  );

  console.log(`sql="${sql}"`);
  console.log(`queryValues=`, queryValues);

  const response = await client.query<Post>(sql, queryValues);
  console.log(response);

  fields.id = response.rows[0][0];

  return fields;
}

export async function doesPostWithRedditIdExist(client: pg.Client, redditId: string): Promise<boolean> {
  const result = await client.query<number>("select count(*) as post_count from posts where reddit_id=$1", [ redditId ]);
  const count = result.rows[0][0];
  return count > 0;
}

/* export async function transaction(client: pg.Client, callback: Function): Promise<any> {
} */

export async function countPosts(client: pg.Client): Promise<number> {
  const result = await client.query<number>("select count(*) as post_count from posts");

  return result.rows[0][0];
}

export async function findAllPosts(client: pg.Client): Promise<Post []> {
  const sql = "select * from posts";

  const result = await client.query<Post>(sql);

  return [...result];
}

export async function connect(config: DbConfig): Promise<pg.Client> {
  return await pg.connect(config);
}

