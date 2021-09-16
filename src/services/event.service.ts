import { EventEmitter } from "stream";
import Movement from "../models/movement"

const event = new EventEmitter()

export function newMovement(movement: Movement) {
    event.emit('movement', movement)
}

export function onMovementAdded(handler: (movement: Movement) => void) {
    event.on('movement', handler)
}

export function boardReset() {
    event.emit('reset')
}

export function onBoardReset(handler: () => void){
    event.on('reset', handler)
}
