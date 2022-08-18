import { Router } from 'express';
import validate from '../../middlewares/validate.middleware';
import validations from './vaccinations.validations';

import AuthController from './vaccinations.controller';

const { vaccineSummaryValidation } = validations;

const router = Router();

const controller = new AuthController();

router.get('/vaccine-summary', validate(vaccineSummaryValidation), controller.vaccineSummary);

export default router;
