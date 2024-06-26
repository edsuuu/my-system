import nodemailer, { Transporter } from 'nodemailer';

export class EmailSender {
    // private transporter: Transporter;
    public assunto: string;
    constructor() {
        // this.transporter = nodemailer.createTransport({
        //     host: process.env.HOST_MAIL,
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.USER_MAIL,
        //         pass: process.env.PASSWD_MAIL,
        //     },
        //     tls: {
        //         ciphers: 'SSLv3',
        //     },
        // });
    }

    public async sendEmail(): Promise<void> {
        const mailOptions = {
            from: `"Meu Portfolio Enviou uma Mensagem" <${process.env.USER_MAIL}>`,
            to: process.env.TO_MAIL,
            subject: 'Teste de E-mail',
            text: 'message',
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('E-mail enviado: ' + info.response);
        } catch (error) {
            console.error('Erro ao enviar e-mail: ', error);
        }
    }
}

export default EmailSender;
