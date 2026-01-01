import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import * as messageService from "../services/messageService.js";
import HttpError from "../errors/httpError.js";

const router = express.Router();

router.post("/encrypt", authMiddleware, async (req, res, next) => {
  try {
    const { cipherType, message } = req.body;
    const {username} = req.headers;
    //validate all the fields were sent by the user.
    if (!username || !cipherType || !message) {
      throw HttpError("must send username cipherType and message.", 400);
    }

    await messageService.addEncryptedMessage(username, cipherType, message);
    return res.json({ message: "message encrypted and added successfully." });
  } catch (error) {
    next(error);
  }
});

router.post("/decrypt", authMiddleware, async (req, res, next) => {
  try {
    const { messageId } = req.body;

    if (!messageId || isNaN(messageId)) {
      throw new HttpError("must pass a valid id", 400);
    }
    
    const result = await messageService.getDecryptMessage(messageId);

    return res.status(200).json(result);

  } catch (error) {
    next(error)
  }
});

router.get("/", authMiddleware, async (req, res, next)=>{

  try{
    const {username} = req.headers;
    
    if(!username){
      throw new HttpError("username must be included.");
    }

    const result = await messageService.getAllUsersMessages(username);
    return res.status(200).json({items : result});
  }catch(error){
    next(error);
  }

})

export default router;
