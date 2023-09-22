const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    gender: Boolean,
    email: String,
    phone: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;