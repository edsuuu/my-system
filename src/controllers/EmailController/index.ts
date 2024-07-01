import { Request, Response } from 'express';
import { ValidationEmail, IsEmpty } from './classes/validacao';
import { MessageReceivedProtocol } from './interfaces/message';
import { SendAndSaveMessages } from './classes/SendAndSaveMessages';

class EmailController {
    async sendMessage(req: Request, res: Response) {
        const bodyValidator = new IsEmpty();
        const emailValidator = new ValidationEmail();

        try {
            if (!req.body) {
                return res.json({ error: 'O corpo da requisição não pode estar vazio' });
            }

            // Recebe os dados no corpo da requisição
            let { name, email, message, assunto }: MessageReceivedProtocol = req.body;

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
            const sendAndSave = new SendAndSaveMessages(name, email, assunto, message);

            // Se passar por todas validacoes é criado um ticket e salvo no banco que vai retornar um boolean
            const novoTicket = await sendAndSave.criarTicket();

            if (novoTicket === true) {
                res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
            } else {
                res.status(400).json({ error: 'Erro ao enviar a mensagem' });
            }
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }
}

export default new EmailController();
