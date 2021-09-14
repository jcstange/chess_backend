var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
export const fruitsRouter = express.Router();
fruitsRouter.use(express.json());
fruitsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fruits = (yield ((_a = collections.fruits) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(fruits);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
fruitsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new ObjectId(id) };
        const fruit = (yield ((_c = collections.fruits) === null || _c === void 0 ? void 0 : _c.findOne(query)));
        if (fruit) {
            res.status(200).send(fruit);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
