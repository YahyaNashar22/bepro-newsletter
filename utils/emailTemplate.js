import nodemailer from "nodemailer";

const sendEmail = async ({ senderEmail, senderCode, receiverEmail, subject, htmlBody, attachment }) => {
    return new Promise((resolve, reject) => {
        try {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: senderEmail,
                    pass: senderCode,
                },
                connectionTimeout: 10000, // 10 seconds
                greetingTimeout: 5000,    // 5 seconds
                socketTimeout: 10000,     // 10 seconds
                debug: true,              // Enable debug logs
                pool: true,              // Use pooled connections
                maxConnections: 5,        // Maximum number of connections to make at once
                maxMessages: 100,         // Maximum number of messages to send per connection
            });

            if (attachment) {

                // Decode Base64 image into a buffer
                const mimeType = attachment.match(/data:(image\/[a-z]+);base64,/)[1];
                const base64Image = attachment.split(";base64,").pop();
                const bufferImage = Buffer.from(base64Image, "base64");



                // Validate MIME type (ensure only PNG or JPEG is allowed)
                if (!["image/jpeg", "image/png"].includes(mimeType)) {
                    return reject(new Error("Unsupported file type. Only JPEG and PNG are allowed."));
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

                            if (error.code === "EAUTH") {
                                return reject(new Error("Invalid email or password. Please check your credentials."));
                            }
                            console.error(error);
                            return reject(error);
                        } else {
                            console.log("Email sent successfully");
                            console.log(info.response);
                            resolve(info.response);
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
                            if (error.code === "EAUTH") {
                                return reject(new Error("Invalid email or password. Please check your credentials."));
                            }
                            console.error(error);
                            return reject(error);
                        } else {
                            console.log("Email sent successfully");
                            console.log(info.response);
                            resolve(info.response);
                        }

                    });
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export default sendEmail;