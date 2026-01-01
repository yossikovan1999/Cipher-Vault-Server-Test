import * as encryption from "../utils/encryption.js";
import * as decryption from "../utils/decryption.js";
import HttpError from "../errors/httpError.js";
import * as messageDal from "../dal/messagesDal.js"; 
import {increaseMessageCount} from "../dal/usersDal.js";


//==========================================
//            addEncryptedMessage
//==========================================
export async function addEncryptedMessage(username, cipherType, message){
    
    
    //here we will encrypt the message.
    const result = encryption.encryptMessage(message, cipherType);
    
    if(result.error){
        throw new HttpError(encrypted. message)
    }

    const encryptedText = result.encrypted;
    
    // add the message to the message db
    const error = await messageDal.addMessage(username, cipherType, encryptedText);

    if(error){
        throw new HttpError("inserting error occured", 500);   
    }
    
    //increase the messages count in the users db.
    const increaseResult = await increaseMessageCount(username, 1);

    if(!increaseResult || increaseResult.modifiedCount < 1){
        throw new Error("error occured when updating the messages count");
    }
}

//==========================================
//             getDecryptMessage
//==========================================

export async function getDecryptMessage(messageId){
    
    const {data, error} = await messageDal.getMessageById(Number(messageId));

    if(error){
        throw new Error("error occured when getting message by id");
    }

    if(!data || data.length === 0){
        throw new HttpError("no message found that matches the specific id", 404)
    }

    const [row] = data;
    
    if(row["encrypted_text"] === null){
        return { "id": 12, "decryptedText": null, "error": "CANNOT_DECRYPT" }
    }

    const result = decryption.decryptMessage(row["encrypted_text"], row["cipher_type"]);

    if(result.error){
        throw new HttpError(encrypted. message)
    }
    
    return {id : messageId, decryptedText : result.decrypted}
}

//==========================================
//           getAllUsersMessages
//==========================================
export async function getAllUsersMessages(username){
    const {data, error} = await messageDal.getAllUsersMessages(username);

    if(error){
        throw new HttpError("error occured when fetching users data", 500);
    }

    if(!data || data.length === 0){
        throw new HttpError("no message found that matches the specific id", 404)
    }

    return data;
}