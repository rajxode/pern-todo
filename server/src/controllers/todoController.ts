
import { Request, Response, NextFunction } from "express";
import { pool } from "../config/dbConfig";

interface todo {
    id:number;
    name:string;
    status:string;
    dueDate:string;
    priority:string;
}

interface ApiResData {
    success:boolean;
    todo?:todo;
    todos?:Array<todo>;
    message?:string;
}

export const getMyTodos = async(_:Request, res:Response, next:NextFunction) : Promise<void> => {
    try {
        const data = await pool.query("SELECT * FROM todos");
        const responseData:ApiResData = {
            success:true,
            todos:data.rows
        }
        res.status(200).json(responseData);
    } catch (error:any) {
        console.log("error in getting data from table", error.message);
        next(error);
    }
}

export const addTodo = async (req:Request, res:Response, next:NextFunction) : Promise<void> => {
    try {
        const {name, status, dueDate, priority} = req.body;
        if(!name || !status || !dueDate || !priority) {
            const responseData:ApiResData = {
                success:false,
                message:"All fields are mandatory"
            }
            res.status(400).json(responseData);
            return;
        }
        await pool.query("INSERT INTO todos (name,status,dueDate,priority) VALUES ($1, $2, $3, $4)",[name, status, dueDate, priority]);
        const responseData:ApiResData = {
            success: true,
            message:"todo added"
        }
        res.status(201).json(responseData);
    } catch (error:any) {
        console.log('error in inserting data into the table', error.message);
        next(error);
    }
}

export const updateTodo = async(req:Request, res:Response, next: NextFunction) : Promise<void> => {
    try {
        const {id} = req.params;
        const {status, priority} = req.body;
        if(!status && !priority) {
            const responseData:ApiResData = {
                success:false,
                message:"Provide data to update"
            }
            res.status(400).json(responseData);
            return;
        }
        let updateQuery, values;
        if(!priority) {
            updateQuery = `
                UPDATE todos
                SET status=$1
                WHERE id=$2 RETURNING *;
            `;
            values=[status,id];
        } else if (!status) {
            updateQuery = `
                UPDATE todos
                SET priority=$1
                WHERE id=$2 RETURNING *;
            `;
            values=[priority,id];
        } else {
            updateQuery = `
                UPDATE todos
                SET status=$1, priority=$2
                WHERE id=$3 RETURNING *;
            `;
            values=[status,priority,id];
        }
        const data = await pool.query(updateQuery,values);
        const responseData:ApiResData = {
            success:true,
            message:"Todo updated",
            todo:data.rows[0]
        }
        res.status(200).json(responseData);
    } catch (error:any) {
        console.log("Error in updating todo", error.message);
        next(error);
    }
}

export const removeTodo = async(req:Request, res:Response, next:NextFunction) : Promise<void> => {
    try {
        const {id} = req.params;
        if(1 > Number(id)){
            const responseData:ApiResData = {
                success: false,
                message:"Invalid Id"
            }
            res.status(400).json(responseData);
            return;
        }
        const getTodoQuery = `
            SELECT * FROM todos WHERE id=$1;
        `;
        const data = await pool.query(getTodoQuery,[id]);
        if(!data.rows[0]) {
            const responseData : ApiResData = {
                success: false,
                message:"Invalid id"
            }
            res.status(400).json(responseData);
            return;
        }
        const delQuery = `
            DELETE FROM todos
            WHERE id=$1;
        `;
        await pool.query(delQuery,[id]);
        const responseData:ApiResData = {
            success:true,
            message:"Todo removed"
        }
        res.status(200).json(responseData);
    } catch (error:any) {   
        console.log("Error in removing todo", error.message);
        next(error);
    }
}