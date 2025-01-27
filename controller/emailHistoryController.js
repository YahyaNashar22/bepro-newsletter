import EmailHistory from "../model/emailHistoryModel.js";

export const getEmailHistory = async (req, res) => {
    try {
        const { query } = req.body;

        const emails = await EmailHistory.find({
            $or: [
                { subject: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ message: "emails fetched successfully", payload: emails });
    } catch (error) {
        res.status(500).json({ message: "Couldn't get emails" });
    }
}