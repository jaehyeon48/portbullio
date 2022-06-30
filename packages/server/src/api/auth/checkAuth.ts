import express, { Request, Response } from 'express';
import { sessionValidator, checkInitialLogin } from '@middlewares';
import { cookieService } from '@services/index';

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/',
		checkInitialLogin,
		sessionValidator,
		async (req: Request, res: Response): Promise<void> => {
			cookieService.issueCookie({
				res,
				name: 'ust',
				value: 'y',
				options: { httpOnly: false }
			});
			res.json({ userId: res.locals.userId, isInitialLogin: res.locals.isInitialLogin });
		}
	);

	return router;
};
