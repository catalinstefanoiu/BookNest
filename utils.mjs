import { randomBytes, pbkdf2Sync } from 'crypto';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getDirname(importUrl) {
  const __filename = fileURLToPath(importUrl);
  const __dirname = dirname(__filename);
  return __dirname;
}

export function hashPassword(salt, password) {
  if (salt && password) {
    return pbkdf2Sync(password, salt, 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
}
