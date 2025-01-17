import Email from "../model/emailModel.js";
import sendEmail from "../utils/emailTemplate.js";

export const getAllEmails = async (req, res) => {
    try {
        const emails = await Email.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            message: 'emails fetched',
            payload: emails
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching emails" });
    }
}

export const addEmailManually = async (req, res) => {
    try {
        const { email } = req.body;

        const prevEmail = await Email.findOne({ email });

        if (prevEmail) return res.status(400).json({ message: "Email already exists" });

        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).send(newEmail);
    } catch (error) {
        res.status(500).json({ message: "Error Adding email" });

    }
}

export const removeEmail = async (req, res) => {
    try {
        const email = req.params.email;

        const foundEmail = await Email.findOne({ email });

        if (!foundEmail) return res.status(404).json({ message: "Email does not exist" });

        await Email.findOneAndDelete({ email });
        res.status(200).json({ message: "email removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing email" });
    }
}

export const sendBulkEmails = async (req, res) => {
    try {
        const { subject, content } = req.body;
        const emails = await Email.find({}).sort({ createdAt: -1 });

        // Send an email to each email in the list
        emails.forEach(({ email }) => {
            const htmlBody = `
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email Template</title>
                    </head>
                    <body>
                        <p>${content}</p>
                    </body>
            </html>`;

            sendEmail({
                receiverEmail: email,
                subject: subject,
                htmlBody: htmlBody,
            });
        });

        res.status(200).send("Emails are being sent.");

    } catch (error) {
        res.status(500).json({ message: "Error sending emails" });
    }
}