import express, { Request, Response } from 'express';
import { sessionValidator } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response): Promise<void> => {
		res.json({ userId: res.locals.userId });
	});

	return router;
};
