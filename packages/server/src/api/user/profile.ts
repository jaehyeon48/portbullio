import express, { NextFunction, Request, Response } from 'express';
import * as userService from '@services/user';
import { sessionValidator } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const data = await userService.getUserInfo(Number(userId));
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	});

	return router;
};
