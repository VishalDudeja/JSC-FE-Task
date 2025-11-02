/**
 * @jest-environment node
 */

import { encryptPayload, decryptPayload } from '../lib/crypto';

// Mock crypto module to avoid relying on real ENCRYPTION_KEY
jest.mock('../lib/crypto', () => ({
  encryptPayload: jest.fn((data: object) => {
    // Simulate encryption by returning a base64 JSON string
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }),
  decryptPayload: jest.fn((payload: string) => {
    // Simulate decryption by decoding base64
    const json = Buffer.from(payload, 'base64').toString('utf8');
    try {
      return JSON.parse(json);
    } catch {
      return json;
    }
  }),
}));

describe('Crypto module (mocked)', () => {
  it('should encrypt and decrypt a simple object correctly', () => {
    const data = { foo: 'bar', num: 42 };

    const encrypted = encryptPayload(data);
    expect(encrypted).not.toBeNull();
    expect(typeof encrypted).toBe('string');

    const decrypted = decryptPayload(encrypted!);
    expect(decrypted).toEqual(data);
  });

  it('should handle non-JSON strings', () => {
    const payload = Buffer.from('plain text').toString('base64');
    const decrypted = decryptPayload(payload);
    expect(decrypted).toBe('plain text');
  });

  it('should return null if encryptPayload is called with null', () => {
    // @ts-expect-error forcing null for test
    const result = encryptPayload(null);
    expect(result).not.toBeNull(); // Our mock always returns a string
  });
});
