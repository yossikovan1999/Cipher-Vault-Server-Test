import express from "express";
import "dotenv/config";
import { connectMongo } from "./database/mongoCon.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

//this will connect to the mongo db database.
await connectMongo();

app.use(express.json());


app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  console.log(
    `server running successfully at - http://www.localhost:${process.env.PORT}`
  );
});