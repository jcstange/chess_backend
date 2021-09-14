var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
export const collections = {};
export function connecToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        //dotenv.config({ path: '../../.env'})
        const client = new MongoClient(process.env.DB_CONN_STRING || "mongodb://localhost:27017");
        client.connect();
        const db = client.db(process.env.DB_NAME || "fruits");
        const fruitsCollection = db.collection(process.env.FRUITS_COLLECTION_NAME || "fruits");
        collections.fruits = fruitsCollection;
        console.log(`Successfully connected to database:  ${db.databaseName} and collection: ${fruitsCollection.collectionName}`);
    });
}
