
import express from "express";
import todoRoutes from "./todoRoutes";

const router = express.Router();


router.use("/todo",todoRoutes);

router.get("/", (req,res) => {
    res.status(200).json({message:"hello"});
});


export default router;