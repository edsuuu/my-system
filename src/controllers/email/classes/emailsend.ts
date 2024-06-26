import nodemailer, { Transporter } from 'nodemailer';

export class EmailSender {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASSWD_MAIL,
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });
    }

    public sendEmail() {
        const mailOptions = {
            from: `"Meu Portfolio Enviou uma Mensagem" <${process.env.USER_MAIL}>`,
            to: process.env.TO_MAIL,
            subject: 'Teste de E-mail',
            text: 'Este é um e-mail de teste enviado usando Nodemailer com o Outlook!',
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar e-mail: ', error);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
        });
    }
}

export default EmailSender;
