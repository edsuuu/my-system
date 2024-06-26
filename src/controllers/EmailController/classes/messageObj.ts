import { MessageReceivedProtocol } from '../interfaces/message';

export class MessageObj implements MessageReceivedProtocol {
    name: string;
    email: string;
    assunto: string;
    message: string;

    constructor(name: string, email: string, assunto: string, message: string) {
        this.name = name;
        this.email = email;
        this.assunto = assunto;
        this.message = message;
    }

    public processMessage(): string {
        const processedMessage = `
        Mensagem criada por ${this.name},
        Solicitou que entre em contato com o email: ${this.email},
        Assunto: ${this.assunto},
        Mensagem:
        ${this.message}
        `;
        return processedMessage;
    }
}
