import { Request, Response } from 'express';
import { ValidationEmail, IsEmpty } from './classes/validacao';
import { MessageReceivedProtocol } from './interfaces/message';
import { SaveMessages } from './classes/SaveMessages';
import SendEmail from './classes/SendEmail';

class EmailController {
    async sendMessage(req: Request, res: Response) {
        const bodyValidator = new IsEmpty();
        const emailValidator = new ValidationEmail();

        try {
            if (!req.body) {
                return res.json({ error: 'O corpo da requisição não pode estar vazio' });
            }

            let { name, email, message, assunto }: MessageReceivedProtocol = req.body;

            name = name?.trim();
            email = email?.trim();
            assunto = assunto?.trim();
            message = message?.trim();

            bodyValidator.bodyIsEmpty(name, email, message, assunto);
            if (!emailValidator.emailIsValid(email)) {
                bodyValidator.errors.push({ message: 'O email é inválido' });
            }

            const errors = bodyValidator.getErrors();
            if (errors.length > 0) {
                return res.json({ errors });
            }

            const saveMessage = new SaveMessages(name, email, assunto, message); // Instanciando a classe

            const result = await saveMessage.salvarMensagem();

            const sendEmail = new SendEmail(); // Instanciando a classe

            const criandoMensagem = sendEmail.createMessageForEmail(name, email, assunto, message);

            const resultSendEmail = await sendEmail.enviarParaEmail(assunto, criandoMensagem);
            console.log(resultSendEmail); // capturar o erro do metodo de enviar para o email

            if (result.success === true) {
                res.status(201).json({
                    statusCodeSaveMessage: 201,
                    messageSave: 'Mensagem salva com sucesso! Em breve entrarei em contato.',
                    statusCodeSendEmail: resultSendEmail.code?.responseCode || resultSendEmail.error?.responseCode,
                    messageEmail: resultSendEmail.code?.messageSuccess || resultSendEmail.error?.response,
                });
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new EmailController();
