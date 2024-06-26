import { Request, Response } from 'express';

class TicketController {
    index(req: Request, res: Response) {
        res.json('hello Ticket');
    }
}

export default new TicketController();
