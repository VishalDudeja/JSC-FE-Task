import React from 'react';
import CardList from '../components/CardList';
import { decryptPayload } from '../lib/crypto';
import './globals.css';
import { Item } from '../utils/types';


async function fetchEncryptedItems(): Promise<Item[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/encrypted`, { cache: "no-store" });
    const json = await res.json();
    // Handle HTTP errors (like 404, 500)
    if (!res.ok || json.error) {
      return json.error;
    }

    // Decrypt the payload
    const data = decryptPayload(json.payload);
    if (!data?.userData) {
      console.error("Decrypted data is invalid or missing userData");
      return [];
    }

    return data.userData as Item[];
  } catch (err) {
    console.error("Fetch Encrypted Items error:", err);
    // Return empty array to prevent page crash
    return [];
  }
}


export default async function Page() {
  const userData = await fetchEncryptedItems();
  return (
    <main>

      {Array.isArray(userData) && userData.length > 0 ? (
        <CardList items={userData} />    
      ) : (
        // If userData is string (error) or empty array
        <p className='no-data'>
          {typeof userData === 'string' ? userData : 'No records found. Please check your Environment variables configuration for the possible cause.'}
        </p>
      )}

    </main>
  );
}
