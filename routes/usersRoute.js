 import express from "express";
 import authMiddleware from "../middleware/authMiddleware.js";
 import * as userService from "../services/usersService.js";
 
 const router = express.Router();

 router.get("/me", authMiddleware, async (req, res, next)=>{
    try{
      const {username} = req.headers;
      const result = await userService.getUserMessageCount(username);
      return res.status(200).json(result);
    }catch(error){
      next(error);
    }
 });

 export default router;