import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITicket extends Document {
    nome: string;
    assunto: string;
    email: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const TicketSchema = new Schema<ITicket>(
    {
        nome: {
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
    },
    { timestamps: true },
);
const TicketModel: Model<ITicket> = mongoose.model<ITicket>('tickets', TicketSchema);

export default TicketModel;
export { ITicket };
