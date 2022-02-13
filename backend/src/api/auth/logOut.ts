import express, { NextFunction, Request, Response } from 'express';
import { sessionService, cookieService } from '@services/index';
import { sessionValidator } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.delete('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { uaat } = req.cookies;
			const logOutResult = await sessionService.deleteSession(uaat);
			if (!logOutResult) throw new Error('Log out failed');

			cookieService.expireCookie(res, 'uaat');
			res.status(200).json({ logOutResult });
		} catch (error) {
			next(error);
		}
	});

	return router;
};
