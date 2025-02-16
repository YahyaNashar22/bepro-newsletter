import nodemailer from "nodemailer";

const sendEmail = ({ senderEmail, senderCode, receiverEmail, subject, htmlBody, attachment }) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: senderEmail,
            pass: senderCode,
        },
    });

    if (attachment) {

        // Decode Base64 image into a buffer
        const mimeType = attachment.match(/data:(image\/[a-z]+);base64,/)[1];
        const base64Image = attachment.split(";base64,").pop();
        const bufferImage = Buffer.from(base64Image, "base64");



        // Validate MIME type (ensure only PNG or JPEG is allowed)
        if (!["image/jpeg", "image/png"].includes(mimeType)) {
            throw new Error("Unsupported file type. Only JPEG and PNG are allowed.");
        }


        transporter.sendMail(
            {
                from: senderEmail,
                to: receiverEmail, // Recipient's email address
                subject: subject, // Subject line
                html: htmlBody, // HTML body
                attachments: [
                    {
                        filename: `attachment.${mimeType?.split("/")[1]}`, // Name of the file
                        content: bufferImage, // Image content as buffer
                        cid: "attachedImage", // Content ID referenced in `cid:attachedImage`
                    },
                ],
            }
            , (error, info) => {
                if (error) {
                    console.log("Error sending email with attachment:");
                    console.error(error);
                } else {
                    console.log("Email sent successfully");
                    console.log(info.response);
                }
            });
    } else {

        transporter.sendMail(
            {
                from: senderEmail,
                to: receiverEmail, // Recipient's email address
                subject: subject, // Subject line
                html: htmlBody, // HTML body
            }
            , (error, info) => {
                if (error) {
                    console.log("Error sending email:");
                    console.error(error);
                } else {
                    console.log("Email sent successfully");
                    console.log(info.response);
                }
            });
    }

}

export default sendEmail;