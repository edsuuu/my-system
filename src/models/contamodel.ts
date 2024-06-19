import mongoose, { Document, Model, Schema } from 'mongoose';
// Interface para representar um documento Conta
interface IConta extends Document {
  dono_conta: string;
  login_conta: string;
  senha_conta: string;
}

// Esquema do Mongoose para Conta
const ContasSchema = new Schema<IConta>({
  dono_conta: {
    type: String,
    default: '',
    required: [true, 'O campo dono da conta é obrigatório'],
    validate: {
      validator: function (v: string) {
        return v.length >= 3 && v.length <= 255;
      },
      message: 'Campo dono conta tem que ter entre 3 a 255 caracteres'
    },
    trim: true,
  },
  login_conta: {
    type: String,
    default: '',
    required: [true, 'O campo login é obrigatório'],
    trim: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return v.length >= 3 && v.length <= 20;
      },
      message: 'Campo login tem que ter entre 3 a 20 caracteres'
    },
  },
  senha_conta: {
    type: String,
    default: '',
    required: [true, 'O campo senha é obrigatório'],
    trim: true,
    validate: {
      validator: function (v: string) {
        return v.length >= 3 && v.length <= 20;
      },
      message: 'Campo senha tem que ter entre 3 a 20 caracteres'
    },
  },
});

// Modelo do Mongoose para Conta
const ContaModel: Model<IConta> = mongoose.model<IConta>('contas', ContasSchema);

export default ContaModel;
export { IConta };
