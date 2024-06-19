import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    login: string;
    permission: string;

}

interface CustomRequest extends Request {
    userId?: string;
    userLogin?: string;
    userPermission?: string;
}

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ error: 'Login required' });

    const [, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        const { id, login, permission } = dados;

        // console.log(dados);

        (req as CustomRequest).userId = id;
        (req as CustomRequest).userLogin = login;
        (req as CustomRequest).userPermission = permission;

        // console.log('Decoded JWT:', dados);
        // console.log('User ID:', id);
        // console.log('User Email:', email);
        // console.log('User Permission:', permission);

        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Token Invalido' });
    }
}
