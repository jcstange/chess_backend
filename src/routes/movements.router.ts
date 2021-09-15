import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Movement from "../models/movement";

export const movementsRouter = express.Router();

movementsRouter.use(express.json());

movementsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const movements = (await collections.movements?.find({}).toArray()) as Movement[];
        res.status(200).send(movements);
    } catch (error) {
        res.status(500).send(error);
    }
});

movementsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const fruit = (await collections.movements?.findOne(query)) as Movement;

        if (fruit) {
            res.status(200).send(fruit);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

movementsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newMovement = req.body as Movement
        const result = await collections.movements?.insertOne(newMovement)

        result
            ? res.status(201).send(`Successfully created new movement from:${newMovement.from} to: ${newMovement.to}`)
            : res.status(200).send('Failed to create new movement');
    } catch (error) {
        console.error(error)
        res.status(400).send(error);
    }
});

movementsRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const result = await collections.movements.deleteMany({})

        result
            ? res.status(200).send(`Successfully dropped collection`)
            : res.status(200).send('Failed to create new movement');
    } catch (error) {
        console.error(error)
        res.status(400).send(error);
    }
});
