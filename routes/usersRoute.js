 import express from "express";
 import getAuthMiddleware from "../middleware/getAuthMiddleware.js";
 import * as userService from "../services/usersService.js";
 
 const router = express.Router();

 router.get("/me", getAuthMiddleware, async (req, res, next)=>{
    try{
      const {username} = req.query;
      const result = await userService.getUserMessageCount(username);
      return res.status(200).json(result);
    }catch(error){
      next(error);
    }
 });

 export default router;