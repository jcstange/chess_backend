import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Fruit from "../models/fruit";

export const fruitsRouter = express.Router();

fruitsRouter.use(express.json());

fruitsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const fruits = (await collections.fruits?.find({}).toArray()) as Fruit[];
        res.status(200).send(fruits);
    } catch (error) {
        res.status(500).send(error);
    }
});

fruitsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const fruit = (await collections.fruits?.findOne(query)) as Fruit;

        if (fruit) {
            res.status(200).send(fruit);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
