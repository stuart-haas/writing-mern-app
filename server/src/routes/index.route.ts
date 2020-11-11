import { Router } from 'express';
import storyRoutes from '@routes/story.route';

const router = Router();

router.use('/story', storyRoutes);

export default router;
