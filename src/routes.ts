import { Router } from 'express';
import InfoController from '@lupa/Controllers/InfoController';

const routes = Router();
routes.get('/', InfoController.index);

export default routes;
