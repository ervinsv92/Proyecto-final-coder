const twilio = require('twilio');
const config = require('../../config/index');

const sid = config.config.sidTwilio;
const token = config.config.tokenTwilio;
const numberTwilio = config.config.numberTwilio;
const numberTwilioWhatsapp = config.config.numberTwilioWhatsapp;


class TwilioMessages{

    constructor(){
        this.twilioClient = twilio(sid, token, {lazyLoading:true});
        console.log(config.config, sid, token, numberTwilio)
    }

    async sendMessage(to, body){
        try {
            const response = await this.twilioClient.messages.create({
                from:numberTwilio, to, body
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async sendMessageWhatsapp(to, body){
        try {
            const response = await this.twilioClient.messages.create({
                from:`whatsapp:${numberTwilioWhatsapp}`, to:`whatsapp:${to}`, body
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new TwilioMessages();