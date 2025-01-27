import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import databaseConnection from './utils/databaseConnection.js';
import { upload } from "./middlewares/multer.js";
import { uploadFile } from './controller/uploadFileController.js';
import { addEmailManually, getAllEmails, removeEmail, sendBulkEmails } from './controller/emailController.js';
import { createUser, login } from './controller/userController.js';
import { getEmailHistory } from './controller/emailHistoryController.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Declaration
dotenv.config();
const app = express();

// CORS Policies
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
}
));

// Configuration Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("uploads"));

// routes
app.post('/upload', upload.single("file"), uploadFile);
app.post('/add-email', addEmailManually);
app.post('/send-bulk-emails', sendBulkEmails);
app.get('/get-emails', getAllEmails);
app.delete('/delete-email/:email', removeEmail);

app.post('/get-email-history', getEmailHistory);


app.post('/create-user', createUser);
app.post('/login', login);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



// Connect to server
app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server Running On Port: ${process.env.PORT}`);
    } else {
        console.log("Couldn't Connect To Server!")
        console.error(`Error: ${error}`);
    }
});
databaseConnection();