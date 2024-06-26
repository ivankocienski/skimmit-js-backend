import dotenv from 'dotenv';

dotenv.config();

export function serverPort() : number {
  return Number(process.env.SERVER_PORT);
}

export function databaseUrl(): string {
  return (process.env.DATABASE_URL || '');
}

export function dbConfig() {
  return {
    user:     process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD
  }
}