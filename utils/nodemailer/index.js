let {createTransport} = require('nodemailer');
const config = require('../../config/index');

const user = config.config.userEmail;
const pass = config.config.passEmail;

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    secure:false,
    auth: {
        user,
        pass
    }
});

const sendEmail = async (to, subject, html)=>{
    try {
        let option = {
            from:user,
            to:to,
            subject,
            html
        }
        const response = await transporter.sendMail(option);
        console.log(response)
    } catch (error) {
       console.log(error) 
    }
}

module.exports = sendEmail;