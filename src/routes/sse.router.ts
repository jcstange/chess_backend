
import express, { Request, Response } from "express";
import * as service from '../services/event.service'
import Movement from '../models/movement'

export const sseRouter = express.Router()

var globalCount = 0

var movements: Movement[]= []

sseRouter.use(express.json())

service.onMovementAdded((movement: Movement) => {
    movements.push(movement)
    globalCount++
})

service.onBoardReset(() => {
    movements = [] 
    globalCount++
})

sseRouter.get("/", async (req: Request, res: Response) => {
    res.set("Content-Type", "text/event-stream")
    res.set("Connection", "keep-alive")
    res.set("Cache-Control", "no-cache")
    res.set("Access-Control-Allow-Origin", "*")
    var innerCount = 0
    setInterval(() => {
        if(globalCount > innerCount) {
            res.status(200).write(`data: ${JSON.stringify(movements)}\n\n`)
            innerCount++
        }
    }, 1000)
});