import { Request, Response } from 'express';

class HomeController {
    index(req: Request, res: Response) {
        res.json('hello homee');
    }
}

export default new HomeController();
