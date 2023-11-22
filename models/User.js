const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        lastname: { type: String, required: true },
        firstname: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    { timestamps: true }
);

// Apply the unique validator plugin to the email field
userSchema.plugin(uniqueValidator);

userSchema.virtual("name").get(function () {
    return `${this.firstname} ${this.lastname}`;
});

userSchema.methods.toPublic = function () {
    const userObject = this.toObject();
    delete userObject.password;
    userObject.name = this.name;
    return userObject;
};

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);