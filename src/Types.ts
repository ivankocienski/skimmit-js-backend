export interface DbConfig {
  user?:     string,
  database?: string,
  host?:     string,
  port?:     number,
  password?: string
}

/* export interface RedditPost {
  redditId: string,
  created: Date,
  url: string,
  authorName: string,
  title: string,
  subreddit: string
} */

export interface Post {
  id: number,
  reddit_id?: string,
  title?: string,
  link?: string,
  sub_reddit?: string,
  date_posted?: Date
}
