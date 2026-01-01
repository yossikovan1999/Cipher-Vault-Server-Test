import * as usersDal from "../dal/usersDal.js";
import HttpError from "../errors/httpError.js";

//====================================
//
//====================================
export async function getUserByUsername(username) {
  const user = await usersDal.getUserByUsername(username);
  return user;
}

//====================================
//
//====================================
export async function addUser(username, password) {
  const user = await usersDal.getUserByUsername(username);

  if (user) {
    throw new HttpError("username already exists in the system", 401);
  }

  await usersDal.addUser(username, password);
}

//====================================
//
//====================================
export async function getUserMessageCount(username) {
  const user = await usersDal.getUserByUsername(username);
  
  if(!user){
    throw new HttpError("User not found", 404);
    
  }

  return {
    username: username,
    encryptedMessagesCount: user.encryptedMessagesCount,
  };
}



