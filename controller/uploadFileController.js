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
            return res.status(400).json({ message: 'No email column found in the uploaded file.' });
        }

        const emails = data.map(row => row[emailColumn]);

        // Filter out invalid emails if needed
        const validEmails = emails.filter(email => /\S+@\S+\.\S+/.test(email));

        // Check for existing emails in the database
        const existingEmails = await Email.find({ email: { $in: validEmails } }).select('email');

        // Create a set of existing emails for easy lookup
        const existingEmailsSet = new Set(existingEmails.map(e => e.email));

        // Filter out emails that are already in the database
        const newEmails = validEmails.filter(email => !existingEmailsSet.has(email));


        if (newEmails.length === 0) {
            return res.status(400).json({ message: 'All emails in the file already exist.' });
        }

        // Insert only new, non-duplicate emails
        const result = await Email.insertMany(newEmails.map(email => ({ email })));

        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('unable to upload file');
    }

}
