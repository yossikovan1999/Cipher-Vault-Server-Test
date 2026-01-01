import supabase from "../database/superbase.js";

const database = "messages";

//=====================================
//            addMessage
//=====================================
export async function addMessage(username, cipherType, encryptedText){
    
    const row = {
        username, 
        cipher_type : cipherType.toUpperCase(),
        encrypted_text : encryptedText.toUpperCase()
    }

    const { error } = await supabase
    .from(database)
    .insert(row);

    return error;
}

//=====================================
//        get message by id
//=====================================
export async function getMessageById(messageId) {
    
    const result = await supabase.from(database).select().eq("id", messageId);

    return result;
}

//=====================================
//        get message by id
//=====================================

export async function getAllUsersMessages(useranme){

    const result = await  supabase.from(database).select().eq("username", useranme);
    
    return result;
}