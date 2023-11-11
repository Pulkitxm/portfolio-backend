// Backend (Node.js with Express)

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose
  .connect(
    "mongodb+srv://pulkit:adminPulkit@portfolio.cghznwd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  browserName: String,
  browserVersion: String,
  userAgentFull: String,
  screenAvailWidth: Number,
  screenAvailHeight: Number,
  windowInnerWidth: Number,
  windowInnerHeight: Number,
  deviceType: String,
  isOnline: Boolean,
  connectionType: String,
  batteryLevel: Object,
  userAgent: String,
  language: String,
  platform: String,
  screenWidth: Number,
  screenHeight: Number,
  colorDepth: Number,
  timezone: String,
  cookiesEnabled: Boolean,
  doNotTrack: String,
  referringUrl: String,
  currentUrl: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a new user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to count users
app.get("/api/countUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ length: users.length });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete users
app.get("/api/deleteUsers", async (req, res) => {
  try {
    await User.deleteMany();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to getIp
app.get("/api/getIpOfUser", async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    res.status(200).json({ ip: ipAddress });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use((req, res, next) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  console.log(`User IP address: ${ipAddress}`);
  next();
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
