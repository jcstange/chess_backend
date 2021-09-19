import { ObjectId } from "mongodb"

export default class movement {
    constructor(
        public type: string,
        public from: string,
        public to: string,
        public id?: ObjectId,
    ) {}
}
