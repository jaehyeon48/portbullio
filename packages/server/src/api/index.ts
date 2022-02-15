import { Router } from 'express';
import auth from './auth';
import user from './user';

export default function appRouter(): Router {
	const router = Router();
	router.use('/auth', auth());
	router.use('/user', user());

	return router;
}
