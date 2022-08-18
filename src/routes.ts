import { Router } from 'express';
import vaccinations from './modules/vaccinations/vaccinations.routes';

const router = Router();

router.use(`/vaccinations`, vaccinations);

export = router;
