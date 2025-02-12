import mongoose from "mongoose";

const { Schema, model } = mongoose;

const emailSchema = new Schema({
    email: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

const Email = model("Email", emailSchema);

export default Email;