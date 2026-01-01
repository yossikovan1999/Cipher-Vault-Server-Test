import {connectMongo} from "../database/mongoCon.js";

const COLLECTION = "users";

const db = await connectMongo()


//==============================
//
//==============================
export async function getUserByUsername(username) {
  const result = await db.collection(COLLECTION).findOne({ username: username });
  return result;
}

//==============================
//
//==============================
export async function addUser(username, password) {
  const user = {
    username,
    password,
    encryptedMessagesCount: 0,
    createdAt: new Date(),
  };

  const result = await db.collection(COLLECTION).insertOne(user);

  return result;
}


//==============================
//
//==============================
export async function increaseMessageCount(username, amount){
  
  const query = {username : username}
  const update = {$inc : {encryptedMessagesCount : amount}}
  const result = await db.collection(COLLECTION).updateOne(query, update);
  
  return result;
}