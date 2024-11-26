
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createTable } from "./models/todo";
import routes from "./routes";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use("/", routes);

createTable();

app.listen(port, () => console.log('server running on port:',port));