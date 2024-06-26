import { Request, Response } from 'express';
import EmailSender from './classes/emailsend';

class EmailController {
    index(req: Request, res: Response) {
        const emailSender = new EmailSender();
        console.log('Enviando o email');
        emailSender.sendEmail();
        res.json('test');
    }
}

export default new EmailController();

// const emailSender = new EmailSender();
// emailSender.sendEmail();
