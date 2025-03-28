import EmailHistory from "../model/emailHistoryModel.js";
import Email from "../model/emailModel.js";
import User from "../model/userModel.js";
import sendEmail from "../utils/emailTemplate.js";

export const getAllEmails = async (req, res) => {
  try {
    const { userId } = req.params;
    const emails = await Email.find({ userId }).sort({ createdAt: -1 });
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
    const { email, userId } = req.body;

    const prevEmail = await Email.findOne({ email, userId });

    if (prevEmail) return res.status(400).json({ message: "Email already exists" });

    const newEmail = new Email({ email, userId });
    await newEmail.save();
    res.status(201).send(newEmail);
  } catch (error) {
    res.status(500).json({ message: "Error Adding email" });

  }
}

export const removeEmail = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const foundEmail = await Email.findOne({ email, userId });

    if (!foundEmail) return res.status(404).json({ message: "Email does not exist" });

    await Email.findOneAndDelete({ email, userId });
    res.status(200).json({ message: "email removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing email" });
  }
}

export const deleteEmails = async (req, res) => {
  try {
    const { emails, userId } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ message: "Invalid input, expected an array of emails" });
    }

    await Email.deleteMany({ email: { $in: emails }, userId }); // Proper filter syntax
    res.status(200).json({ message: "Emails removed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error removing emails" });

  }
}

export const sendBulkEmails = async (req, res) => {
  try {
    const { subject, content, attachment, userId, code } = req.body;



    const user = await User.findById(userId);

    if (user.role !== "admin" && (!code || code == "")) {
      return res.status(404).json({ message: "App Code is required!" });
    }

    const emails = await Email.find({ userId }).sort({ createdAt: -1 });

    if (emails.length == 0 || !emails) {
      return res.status(404).json({ message: "Please add recipients first!" });
    }

    // Send an email to each email in the list
    // emails.forEach(({ email }) => {
    //   const htmlBody = `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head>
    //       <meta charset="UTF-8" />
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //       <title>Bepro Email</title>
    //     </head>
    //     <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    //       <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto; max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px;">
    //         <tr>
    //           <td style="padding: 20px; text-align: center; background-color: #7ac2bc; color: #ffffff; font-size: 24px; font-weight: bold;">BE NEXT</td>
    //         </tr>
    //         <tr>
    //           <td style="padding: 20px">
    //             <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">Dear ${email},</p>
    //             <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">${content}</p>
    //             ${attachment
    //       ? `<div style="text-align: center; margin: 20px 0;">
    //                       <img src="cid:attachedImage" alt="Attached image" style="max-width: 100%; height: auto;" />
    //                    </div>`
    //       : ""
    //     }
    //             <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">If you have any questions, feel free to <a href="mailto:${user.email}" style="color: #7ac2bc; text-decoration: none">contact our support team</a>.</p>
    //             <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">Best regards, <br /> The Team</p>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 14px; color: #777;">&copy; 2025 Bepro. All rights reserved.</td>
    //         </tr>
    //       </table>
    //     </body>
    //   </html>`;



    //   sendEmail({
    //     senderEmail: user.email,
    //     senderCode: user.role == "admin" ? process.env.SENDER_PASSWORD : code,
    //     receiverEmail: email,
    //     subject: subject,
    //     htmlBody: htmlBody,
    //     attachment: attachment,
    //   });
    // });

    const emailPromises = emails.map(({ email }) => {
      const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Bepro Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto; max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #7ac2bc; color: #ffffff; font-size: 24px; font-weight: bold;">BE NEXT</td>
            </tr>
            <tr>
              <td style="padding: 20px">
                <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">Dear ${email},</p>
                <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">${content}</p>
                ${attachment ? `<div style="text-align: center; margin: 20px 0;">
                    <img src="cid:attachedImage" alt="Attached image" style="max-width: 100%; height: auto;" />
                 </div>` : ""}
                <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">If you have any questions, feel free to <a href="mailto:${user.email}" style="color: #7ac2bc; text-decoration: none">contact our support team</a>.</p>
                <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5">Best regards, <br /> The Team</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 14px; color: #777;">&copy; 2025 Bepro. All rights reserved.</td>
            </tr>
          </table>
        </body>
      </html>`;

      return sendEmail({
        senderEmail: user.email,
        senderCode: user.role == "admin" ? process.env.SENDER_PASSWORD : code,
        receiverEmail: email,
        subject: subject,
        htmlBody: htmlBody,
        attachment: attachment,
      });
    });

    // Wait for all emails to be sent and handle failures
    await Promise.all(emailPromises);

    await EmailHistory.create({ subject, content, userId });

    res.status(200).send("Emails are being sent.");

  } catch (error) {
    console.error("Error in sendBulkEmails:", error);

    if (error.message.includes("Invalid email or password")) {
      return res.status(401).json({ message: "Invalid email or password. Please check your credentials." });
    }

    res.status(500).json({ message: "Error sending emails", error: error.message });
  }
}