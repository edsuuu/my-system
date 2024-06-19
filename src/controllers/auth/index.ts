import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel';

class authController {

    async store(req: Request, res: Response): Promise<Response> {
        const { login = '', password = '' } = req.body;

        if (!login || !password) {
            return res.status(401).json({ errors: ['Credenciais inválidas'] });
        }

        const user = await UserModel.findOne({ login }).exec();

        if (!user) {
            return res.status(401).json({ errors: ['Usuário não existe'] });
        }

        if (!(await user.passwordIsValid(password))) {
            return res.status(401).json({ errors: ['Senha inválida'] });
        }

        const { id, permission, email } = user;

        // console.log('User before token generation:', { id, email, permission });

        const token = jwt.sign({ id, login, permission }, process.env.TOKEN_SECRET as string, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({ token, user: { nome: user.nome, login, id, permission, email } });
    }
}

export default new authController();
