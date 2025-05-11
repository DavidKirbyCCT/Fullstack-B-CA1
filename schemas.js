const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
});

// Hash and salt passwords
userSchema.plugin(passportLocalMongoose);

// Helper db object
const User = mongoose.model("User", userSchema);


module.exports = {
  User,
};
