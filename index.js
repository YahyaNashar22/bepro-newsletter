import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

import databaseConnection from './utils/databaseConnection.js';

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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));

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