import { Request, Response } from 'express';

class HomeController {
    index(req: Request, res: Response) {
        res.json('hello home');
    }
}

export default new HomeController();
