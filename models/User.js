const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, min: 1, max: 280},
  email: {type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],},
  thoughts: [{type: mongoose.Schema.Types.ObjectId, ref: "Thought"},],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"},],
});

userSchema.virtual("friendCount").get(function() {
  return this.friends.length || "Time to go make some friends!";
});

const User = model("user", userSchema);

module.exports = User;