import transporter from "./nodemailerTransporter.js";

const sendEmail = ({ receiverEmail, subject, htmlBody }) => {
    transporter.sendMail(
        {
            from: process.env.SENDER_EMAIL,
            to: receiverEmail, // Recipient's email address
            subject: subject, // Subject line
            html: htmlBody, // HTML body
        }
        , (error, info) => {
            if (error) {
                console.log(chalk.bold.red("Error sending email:"));
                console.error(error);
            } else {
                console.log("Email sent successfully");
                console.log(info.response);
            }
        });
}

export default sendEmail;