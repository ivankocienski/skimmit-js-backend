import dotenv from 'dotenv';

dotenv.config();

export function serverPort() : number {
  return Number(process.env.SERVER_PORT);
}
