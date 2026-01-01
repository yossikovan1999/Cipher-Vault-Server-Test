import express from "express";
import messagesRoute from "../routes/messagesRoute.js";
import * as usersService from "../services/usersService.js";
import usersRoute from "../routes/usersRoute.js";

const router = express.Router();

router.post("/auth/register", async (req, res, next)=>{

    try{
        const {username, password} = req.body;
        await usersService.addUser(username, password)
        return res.status(201).json({message : "user adde dsuccessfully."})
    }catch(error){
        next(error);
    }
})

router.use("/messages", messagesRoute)

router.use("/users", usersRoute);

export default router;