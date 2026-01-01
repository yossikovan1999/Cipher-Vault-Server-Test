import { MongoClient } from "mongodb";

let client;

let db;

const URI = process.env.MONGO_URL;
const DATABASE =  process.env.MONGO_DATABASE_NAME;

export async function connectMongo() {
  if (db) return db; // return connection
  client = new MongoClient(URI);
  await client.connect();
  db = client.db(DATABASE);
  console.log("MongoDB connected:", db.databaseName);
  return db;
}


