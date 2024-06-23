import dotenv from 'dotenv';
import { join } from 'path';
import { getDirname } from './utils.mjs';

const __dirname = getDirname(import.meta.url);

// Set the env file
let path = join(__dirname, '/.env');
const result = dotenv.config({ path });
if (result.error && process.env.NODE_ENV === 'development') {
  throw result.error;
}
