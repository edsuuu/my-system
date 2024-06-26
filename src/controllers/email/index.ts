import { Request, Response } from 'express';

class EmailController {
    index(req: Request, res: Response) {
        res.json('hello Email');
    }
}

export default new EmailController();
