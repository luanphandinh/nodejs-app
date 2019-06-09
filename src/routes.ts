import { Router } from 'express';
import InfoController from '@src/Controllers/InfoController';

const routes = Router();
routes.get('/', InfoController.index);

export default routes;
