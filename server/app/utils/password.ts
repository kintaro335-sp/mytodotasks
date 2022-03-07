const { randomBytes, scryptSync, timingSafeEqual } = require('crypto');

export function createPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hashedPassword}`;
}

export function comparePasswords(passwordInput: string, passwordDB: string): boolean {
  if(Boolean(passwordInput) && Boolean(passwordDB)){
    const [salt, key] = passwordDB.split(':');
    const hashedBuffer = scryptSync(passwordInput, salt, 64).toString('hex');

    const keyBuffer = Buffer.from(key, 'hex');

    return timingSafeEqual(hashedBuffer, keyBuffer);
  }
  return false;
}
