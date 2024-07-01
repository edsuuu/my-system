import TicketModel from '../../../Models/TicketsModel';

export class SendAndSaveMessages {
    private readonly name: string;
    private readonly email: string;
    private readonly assunto: string;
    private readonly message: string;

    constructor(name: string, email: string, assunto: string, message: string) {
        this.name = name;
        this.email = email;
        this.assunto = assunto;
        this.message = message;
    }

    async criarTicket(): Promise<boolean> {
        try {
            const novoTicket = new TicketModel({
                name: this.name,
                email: this.email,
                assunto: this.assunto,
                message: this.message,
            });

            await novoTicket.save();

            this.enviarEmail(this.createMessageForEmail());

            return true;
        } catch (error) {
            console.error('Erro ao criar o ticket:', error);
            throw error;
        }
    }

    enviarEmail(processedMessage: string): void {
        console.log('Vindo do enviar email', processedMessage);
        console.log('Email enviado com sucesso!');
    }

    createMessageForEmail(): string {
        const processedMessage = `
        <h1>Mensagem criada por ${this.name},<h1>
        <h2>Solicitou que entre em contato com o email: ${this.email},<h2>
        <h2>Assunto da Mensagem: ${this.assunto},<h2>
        <h2>Mensagem:<h2>
        <h2>${this.message}<h2>
        `;
        return processedMessage;
    }
}
