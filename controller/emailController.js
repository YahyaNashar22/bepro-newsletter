import Email from "../model/emailModel.js";

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
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).send(newEmail);
    } catch (error) {
        res.status(500).json({ message: "Error Adding email" });

    }
}