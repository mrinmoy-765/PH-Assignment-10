const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncoxxcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("ChillGamer").collection("Users");
    const reviewCollection = client.db("ChillGamer").collection("Reviews");
    const watchListCollection = client.db("ChillGamer").collection("WatchList");

    //create User
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      // console.log(newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //get user by email retrived from firebase
    app.get("/users", async (req, res) => {
      try {
        const email = req.query.email;
        if (!email)
          return res.status(400).send({ message: "Email is required" });

        const user = await userCollection.findOne({ email }); // ✅ correct variable

        if (!user) return res.status(404).send({ message: "User not found" });

        res.send(user);
      } catch (error) {
        console.error("Error in /users route:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    //create review
    app.post("/reviews", async (req, res) => {
      const newReview = req.body;
      // console.log(newReview);
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    });

    //get all review
    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //get specific review details
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.findOne(query);
      res.send(result);
    });

    //get logged in users all reviews
    app.get("/reviewsByEmail", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }

      const query = { email: email };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    // Update review
    app.put("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedReview = req.body;

      console.log("Updating Review with filter:", filter);
      console.log("New data:", updatedReview);

      const updateDoc = {
        $set: {
          coverUrl: updatedReview.coverUrl,
          title: updatedReview.title,
          description: updatedReview.description,
          rating: updatedReview.rating,
          year: updatedReview.year,
          genre: updatedReview.genre,
        },
      };

      const result = await reviewCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //delete review
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // Check if in watchlist - MODIFIED
    app.get("/watchlist/check", async (req, res) => {
      try {
        const { reviewId, userEmail } = req.query;
        if (!reviewId || !userEmail) {
          return res
            .status(400)
            .json({ message: "Missing reviewId or userEmail query parameter" });
        }

        const exists = await watchListCollection.findOne({
          reviewId,
          userEmail,
        });

        if (exists) {
          res.status(200).json({ exists: true });
        } else {
          res.status(200).json({ exists: false });
        }
      } catch (error) {
        console.error("Error checking watchlist:", error);
        res
          .status(500)
          .json({ message: "Internal server error while checking watchlist" });
      }
    });

    app.post("/watchlist", async (req, res) => {
      try {
        const newItem = req.body;
        if (!newItem.reviewId || !newItem.userEmail) {
          return res
            .status(400)
            .json({ message: "Missing required fields for watchlist item" });
        }
        const result = await watchListCollection.insertOne(newItem);
        res.status(201).json({ insertedId: result.insertedId });
      } catch (error) {
        console.error("Error adding to watchlist:", error);
        if (error.code === 11000) {
          return res
            .status(409)
            .json({ message: "Item already exists in watchlist." });
        }
        res
          .status(500)
          .json({ message: "Internal server error while adding to watchlist" });
      }
    });

    //get logged in users watchList
    app.get("/watchListByEmail", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }

      try {
        const result = await watchListCollection
          .find({ userEmail: email })
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    //remove from watchList
    app.delete("/watchList/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await watchListCollection.deleteOne(query);
      res.send(result);
    });

    // Get highest rated games (rating > 6, limit to 6)
    app.get("/highestRated", async (req, res) => {
      try {
        const result = await reviewCollection
          .find({ rating: { $gt: 6 } })
          .sort({ rating: -1 })
          .limit(6)
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching highest rated games:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Chill Gamer server is running");
});

app.listen(port, () => {
  console.log(`Chill Gamer is running on port: ${port}`);
});
