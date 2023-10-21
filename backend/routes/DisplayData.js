const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

const mongoUrl =
  "mongodb+srv://anuragtandon54321:anu1122gamer@cluster0.htkbsue.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const dbName = "gofoodmern";
const collectionName = "food_items";

router.post("/foodData", async (req, res) => {
  try {
    // Connect to the MongoDB database
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const collection2=db.collection("foodCategory")
    // Fetch data from the collection (e.g., all documents)
    const data = await collection.find().toArray();
    const data2=await collection2.find().toArray();
    global.food=data;
    global.category=data2;
    
    // Return the data as a JSON response
    res.json([global.food,global.category]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
