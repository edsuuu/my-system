import nodemailer, { Transporter } from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface EmailError extends Error {
    responseCode?: number;
    response?: string;
    command?: string;
}

export default class SendEmail {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
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

    public async enviarParaEmail(
        assunto: string,
        processedMessage: string,
    ): Promise<{ success: boolean; code?: { responseCode?: number; messageSuccess?: string }; error?: { command?: string; response?: string; responseCode?: number } }> {
        const mailOptions = {
            from: `"Meu Portfolio Enviou uma Mensagem" <${process.env.USER_MAIL}>`,
            to: process.env.TO_MAIL,
            subject: assunto,
            text: processedMessage,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('E-mail enviado: ' + info.response);
            return { success: true, code: { responseCode: 200, messageSuccess: 'E-mail enviado com sucesso' } };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: EmailError | any) {
            return { success: false, error: { command: error.command, response: error.response, responseCode: error.responseCode } };
        }
    }

    createMessageForEmail(name: string, email: string, assunto: string, message: string): string {
        return `
            <h1>Mensagem criada por ${name}</h1>
            <h2>Solicitou que entre em contato com o email: ${email}</h2>
            <h2>Assunto da Mensagem: ${assunto}</h2>
            <h2>Mensagem:</h2>
            <h2>${message}</h2>
        `;
    }
}
