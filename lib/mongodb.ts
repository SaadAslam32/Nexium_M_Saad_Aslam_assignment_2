// lib/mongodb.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = 'blogSummariser';

export async function saveFullTextToMongoDB(url: string, fullText: string) {
  try {
    if (!client.isConnected) {
      await client.connect();
    }

    const db = client.db(dbName);
    const collection = db.collection('blogs');

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date(),
    });

    console.log('Saved to MongoDB:', result.insertedId);
  } catch (error) {
    console.error('MongoDB Error:', error);
  }
}
