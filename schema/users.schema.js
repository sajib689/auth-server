// path: auth-server/schema/users.schema.js

import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: { type: String },
    lastName:  { type: String},
    email:     { type: String, required: true},
    password:  { type: String, required: true },
    phone:     { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
