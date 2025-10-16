// apps/jwt-api/src/app/jwt/auth/keys.util.ts
import * as fs from 'fs';
import * as path from 'path';

export function readPemFromEnv(varKey: string, pathKey: string): string {
  const inline = process.env[varKey];
  if (inline && inline.trim()) return inline.replace(/\\n/g, '\n');

  const p = process.env[pathKey];
  if (!p) throw new Error(`Missing ${varKey} or ${pathKey}`);

  const resolved = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  if (!fs.existsSync(resolved)) throw new Error(`File not found: ${resolved}`);

  return fs.readFileSync(resolved, 'utf8');
}

export const getPrivateKey = () => readPemFromEnv('JWT_PRIVATE_KEY', 'JWT_PRIVATE_KEY_PATH');
export const getPublicKey  = () => readPemFromEnv('JWT_PUBLIC_KEY',  'JWT_PUBLIC_KEY_PATH');
