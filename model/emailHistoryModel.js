import mongoose from "mongoose";

const { Schema, model } = mongoose;

const emailHistorySchema = new Schema({
    subject: String,
    content: String,
}, {
    timestamps: true
});

const EmailHistory = model("EmailHistory", emailHistorySchema);
export default EmailHistory;