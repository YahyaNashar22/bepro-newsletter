import xlsx from "xlsx";

import Email from "../model/emailModel.js";

export const uploadFile = async (req, res) => {
    try {
        const file = xlsx.readFile(req.file.path);
        const sheets = file.SheetNames;
        const data = xlsx.utils.sheet_to_json(file.Sheets[sheets[0]]);

        // Find the key that contains emails
        const emailColumn = Object.keys(data[0]).find(key => key.toLowerCase().includes('email'));

        if (!emailColumn) {
            return res.status(400).send('No email column found in the uploaded file.');
        }

        const emails = data.map(row => row[emailColumn]);

        // Filter out invalid emails if needed
        const validEmails = emails.filter(email => /\S+@\S+\.\S+/.test(email));

        Email.insertMany(emails.map(email => ({ email })), (err, docs) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(docs);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('unable to upload file');
    }

}
