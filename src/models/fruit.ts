import { ObjectId } from "mongodb";

export default class fruit {
    constructor(public name: string, public color: string, public id?: ObjectId) {}
}
