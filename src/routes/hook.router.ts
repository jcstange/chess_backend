
import express, { Request, Response } from "express";

export const hookRouter = express.Router();

hookRouter.use(express.json());

hookRouter.get("/", async (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).end()
});