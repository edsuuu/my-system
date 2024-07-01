import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITicket extends Document {
    name: string;
    assunto: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const MensagemModel = new Schema<ITicket>(
    {
        name: {
            type: String,
            default: '',
            required: true,
            trim: true,
        },
        assunto: {
            type: String,
            default: '',
            required: true,
            trim: true,
        },
        email: {
            type: String,
            default: '',
            required: true,
            trim: true,
        },
        message: {
            type: String,
            default: '',
            required: true,
            trim: true,
        },
    }, // Para atualizar a data no banco, e excluir depois de 7 dias
    {
        timestamps: true,
        // expireAfterSeconds: 604800,
    },
);
//ta salvando no banco mas nao ta expirando
MensagemModel.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

const TicketModel: Model<ITicket> = mongoose.model<ITicket>('tickets', MensagemModel);

export default TicketModel;
export { ITicket };
