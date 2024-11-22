
import express, { Request, Response } from "express";

const app = express();

const port = 5001;

app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        success:true,
        message:"Hello"
    })
})

app.listen(port, () => console.log('server running on port:',port));