import MensagemModel from '../../../Models/MensagemModel';

export class SaveMessages {
    constructor(
        private readonly name: string,
        private readonly email: string,
        private readonly assunto: string,
        private readonly message: string,
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async salvarMensagem(): Promise<{ success: boolean; error?: any }> {
        try {
            const novaMensagem = new MensagemModel({
                name: this.name,
                email: this.email,
                assunto: this.assunto,
                message: this.message,
            });

            await novaMensagem.save();

            return { success: true };
        } catch (error) {
            console.error('Erro ao Salvar A Mensagem :', error);
            return { success: false, error };
        }
    }
}
