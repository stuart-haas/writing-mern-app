import { Router } from 'express';
import { findAll, findOne, create } from '@controllers/story.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);

export default router;
