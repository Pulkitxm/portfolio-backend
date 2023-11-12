const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://pulkit:adminPulkit@portfolio.cghznwd.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  isOnline: Boolean,
  connectionType: String,
  language: String,
  platform: String,
  screenWidth: Number,
  screenHeight: Number,
  timezone: String,
  referringUrl: String,
  currentUrl: String,
  dateTime: Date,
  country_code: String,
  country_name: String,
  city: String,
  postal: String,
  latitude: Number,
  longitude: Number,
  state: String,
  ip: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/countUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ length: users.length });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/deleteUsers", async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).send("Database resetted");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getIpOfUser", async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    res.status(200).json({ ip: ipAddress });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
