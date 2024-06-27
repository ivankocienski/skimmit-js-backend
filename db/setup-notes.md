# How to set up the database

Log in to psql with super-user account.

```
CREATE
  ROLE skimmit_dev_role
  WITH LOGIN ENCRYPTED PASSWORD
  'password';

CREATE DATABASE skimmit_dev_db OWNER skimmit_dev_role;

\c skimmit_dev_db

GRANT
  SELECT, INSERT, UPDATE, DELETE
  ON ALL TABLES
  IN SCHEMA public
  TO skimmit_dev_role;
```
Now create the tables

```
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  reddit_id VARCHAR NOT NULL,
  title VARCHAR,
  link VARCHAR,
  sub_reddit VARCHAR,
  date_posted TIMESTAMP
);

```

Now need a `have_read` flag on posts

```
ALTER TABLE posts ADD COLUMN have_read BOOLEAN DEFAULT FALSE;
```
