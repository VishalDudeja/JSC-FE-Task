import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const key = ENCRYPTION_KEY ? Buffer.from(ENCRYPTION_KEY, 'base64') : null;

/**
 * Encrypt an object using AES-256-GCM.
 * Returns base64 string if successful, or null if encryption failed / key missing.
 */
export function encryptPayload(data: object): string | null {
  if (!key) {
    console.warn('Cannot encrypt payload: ENCRYPTION_KEY is missing.');
    return null;
  }

  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const plaintext = JSON.stringify(data);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    const combined = Buffer.concat([iv, authTag, encrypted]);
    return combined.toString('base64');
  } catch (err: any) {
    console.error('Encryption failed:', err.message ?? err);
    return null;
  }
}

/**
 * Decrypt a base64 payload using AES-256-GCM.
 * Returns parsed object if JSON, raw string if not, or null if decryption failed / key missing.
 */
export function decryptPayload(payloadB64: string): any {
  if (!key) {
    console.warn('Cannot decrypt payload: ENCRYPTION_KEY is missing.');
    return null;
  }

  try {
    const combined = Buffer.from(payloadB64, 'base64');

    const iv = combined.slice(0, 12);
    const authTag = combined.slice(12, 28);
    const encrypted = combined.slice(28);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const text = decrypted.toString('utf8');

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (err: any) {
    console.error('Decryption failed:', err.message ?? err);
    return null;
  }
}
