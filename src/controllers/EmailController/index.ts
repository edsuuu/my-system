import { Request, Response } from 'express';
import { ValidationEmail, IsEmpty } from './classes/validacao';
import { MessageObj } from './classes/messageObj';
import { MessageReceivedProtocol } from './interfaces/message';

class EmailController {
    sendMessage(req: Request, res: Response) {
        const bodyValidator = new IsEmpty();
        const emailValidator = new ValidationEmail();

        try {
            if (!req.body) {
                return res.json({ error: 'O corpo da requisição não pode estar vazio' });
            }

            // Recebe os dados no corpo da requisição
            let { name, email, message, assunto }: MessageReceivedProtocol = req.body;
            console.log(req.body);

            // Verifica a se tem espaços na esquerda ou direita da string
            name = name?.trim();
            email = email?.trim();
            assunto = assunto?.trim();
            message = message?.trim();

            // Faz a validacao de todos os campos recebido
            bodyValidator.bodyIsEmpty(name, email, message, assunto);
            if (!emailValidator.emailIsValid(email)) {
                bodyValidator.errors.push({ message: 'O email é inválido' });
            }

            // Se houver erro retorna todos erros num array
            const errors = bodyValidator.getErrors();
            if (errors.length > 0) {
                return res.json({ errors });
            }
            const messageObj = new MessageObj(name, email, assunto, message);

            console.log('vindo do index', messageObj);

            // Se passar por todas validacoes é mandado para processamento para criar a mensagem para enviar para o email
            const processedMessage = messageObj.processMessage();

            console.log(processedMessage);
            res.json(processedMessage);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }
}

export default new EmailController();
