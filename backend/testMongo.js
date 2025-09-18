const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ksudeesh761_db_user:Sudeesh_123@cluster0.ho2kgac.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected successfully to MongoDB Atlas");

        const db = client.db("tododb");
        const collection = db.collection("todos");

        // Insert a test doc
        const result = await collection.insertOne({ task: "test connection", done: false });
        console.log("Inserted document:", result.insertedId);

        // Fetch docs
        const docs = await collection.find().toArray();
        console.log("Docs in collection:", docs);
    } catch (err) {
        console.error("❌ Connection failed:", err);
    } finally {
        await client.close();
    }
}

run();
