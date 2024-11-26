
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createTable } from "./models/todo";
import routes from "./routes";

const app = express();

const port = 5001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", routes);

createTable();

app.listen(port, () => console.log('server running on port:',port));