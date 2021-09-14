"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fruitsRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.fruitsRouter = express_1.default.Router();
exports.fruitsRouter.use(express_1.default.json());
exports.fruitsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fruits = (yield ((_a = database_service_1.collections.fruits) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(fruits);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.fruitsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const fruit = (yield ((_c = database_service_1.collections.fruits) === null || _c === void 0 ? void 0 : _c.findOne(query)));
        if (fruit) {
            res.status(200).send(fruit);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
//# sourceMappingURL=fruits.router.js.map