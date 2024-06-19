import bcryptjs from 'bcryptjs';
import mongoose, { Document, Model, Schema } from 'mongoose';

type RolesTypes = 'admin' | 'user';

interface IUser extends Document {
    nome: string;
    email: string;
    login: string;
    password_hash: string;
    password?: string;
    _password?: string;
    passwordIsValid(password: string): Promise<boolean>;
    permission: RolesTypes;
}

const UserSchema = new Schema<IUser>({
    nome: {
        type: String,
        default: '',
        required: [true, 'Campo nome é obrigatório'],
        validate: {
            validator: function (v: string) {
                return v.length >= 3 && v.length <= 255;
            },
            message: 'Campo nome precisa ter entre 3 a 255 caracteres'
        },
        trim: true,
    },
    email: {
        type: String,
        default: '',
        required: [true, 'Campo e-mail é obrigatório'],
        unique: true,
        validate: {
            validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: 'Email inválido',
        },
    },
    login: {
        type: String,
        default: '',
        required: [true, 'Campo Login é obrigatório'],
        unique: true,
        validate: {
            validator: function (v: string) {
                return v.length >= 3 && v.length <= 255;
            },
            message: 'Campo Login precisa ter entre 3 a 255 caracteres'
        },
    },
    password_hash: {
        type: String,
        default: '',
    },
    permission: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

UserSchema.virtual('password')
    .set(function (this: IUser, password: string) {
        this._password = password;
        if (password.length < 6 || password.length >= 30) {
            throw new Error('Campo senha tem que ter entre 6 a 30 caracteres');
        }
        this.password_hash = bcryptjs.hashSync(password, 10);
    })
    .get(function (this: IUser) {
        return this._password;
    });

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password_hash = await bcryptjs.hash(this.password!, 10);
    }
    next();
});

UserSchema.methods.passwordIsValid = async function (password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password_hash);
};

const UserModel: Model<IUser> = mongoose.model<IUser>('users', UserSchema);

export default UserModel;
export { IUser };
