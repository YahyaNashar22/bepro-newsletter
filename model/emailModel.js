import mongoose from "mongoose";

const { Schema, model } = mongoose;

const emailSchema = new Schema({
    email: String,
}, {
    timestamps: true
});

const Email = model("Email", emailSchema);

export default Email;