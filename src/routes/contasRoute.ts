import { Router } from 'express';
import contasController from '../controllers/Contas';

import loginRequired from '../middleware/loginRequired';

const contaRoute: Router = Router();

contaRoute.get('/', loginRequired, contasController.index);
contaRoute.post('/', loginRequired, contasController.store);
contaRoute.put('/:id', loginRequired, contasController.update);
contaRoute.delete('/:id', loginRequired, contasController.delete);

export { contaRoute };
