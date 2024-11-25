
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { pool } from "./config/dbConfig";

const app = express();

const port = 5001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",async(req:Request, res:Response) => {
    try {

        await pool.query("CREATE TABLE IF NOT EXISTS todos(id SERIAL PRIMARY KEY, name VARCHAR(50), status VARCHAR(15), dueDate VARCHAR(30), priority VARCHAR(10));")
        res.status(200).json({
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
})

app.post("/add-todo", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, status, dueDate, priority} = req.body;
        if(!name || !status || !dueDate || !priority){
            res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        await pool.query("INSERT INTO todos (name,status,dueDate,priority) VALUES ($1, $2, $3, $4)",[name, status, dueDate, priority]);
        res.status(200).json({
            success: true,
            message:"todo added"
        });
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => console.log('server running on port:',port));