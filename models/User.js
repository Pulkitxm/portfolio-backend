// Update the user schema
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
  batteryLevel: Object, // Adjust this based on the actual structure of the battery level data
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
