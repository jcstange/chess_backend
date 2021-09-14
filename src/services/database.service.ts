import * as mongoDB from "mongodb";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export const collections: { fruits?: mongoDB.Collection } = {};

export async function connecToDatabase() {
    dotenv.config();
    //dotenv.config({ path: '../../.env'})

    const client: mongoDB.MongoClient = new MongoClient(process.env.DB_CONN_STRING);

    client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const fruitsCollection: mongoDB.Collection = db.collection(process.env.FRUITS_COLLECTION_NAME);

    collections.fruits = fruitsCollection;

    console.log(
        `Successfully connected to database:  ${db.databaseName} and collection: ${fruitsCollection.collectionName}`,
    );
}
