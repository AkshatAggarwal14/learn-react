import { MongoClient } from 'mongodb';

let db;

async function connectToDB(callback) {
    const client = new MongoClient(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ou7whgs.mongodb.net/?retryWrites=true&w=majority`
    );
    await client.connect();

    db = client.db('react-blog-db-new');
    callback();
}

export { db, connectToDB };
