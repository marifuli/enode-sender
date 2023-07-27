const nodemailer = require("nodemailer");

async function sendMail (state, report_error, report_success) 
{
    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure == 1,
        auth: {
            user: smtp.username,
            pass: smtp.password
        }
    });
    var message = {
        from: "sender@server.com",
        to: "receiver@sender.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>",
        attachments: [
            {
                filename: 'text.html',
                content: 'hell',
                contentType: 'text/html'
            }
        ]
    };
    return transporter.sendMail(message)
}
export default sendMail;