import { NextRequest } from 'next/server';
import { encryptPayload } from '../../../lib/crypto';
import { getRandomDate, formatDateTime } from '../../../utils/datetime';
import { userData } from '@/userdatamock/userData';

export async function GET(_req: NextRequest) {
  const now = new Date();

  // Add random date + time
  const itemsWithTimestamps = userData.map(item => {
    const randomDate = getRandomDate(
      new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30), // within last 30 days
      now
    );
    return {
      ...item,
      ts: formatDateTime(randomDate)
    };
  });

  // Encrypt payload
  const payload = encryptPayload({ userData: itemsWithTimestamps });
  if (!payload) {
    return new Response(JSON.stringify({ error: 'Encryption key missing or encryption failed. Check for the key, if missing, Copy .env.local.example to .env.local and set it.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ payload }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

}
