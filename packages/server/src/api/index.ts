import { Router } from 'express';
import auth from './auth';
import user from './user';
import portfolio from './portfolio';
import symbol from './symbol';
import stock from './stock';

export default function appRouter(): Router {
	const router = Router();
	router.use('/auth', auth());
	router.use('/user', user());
	router.use('/portfolios', portfolio());
	router.use('/symbol', symbol());
	router.use('/stock', stock());

	return router;
}
