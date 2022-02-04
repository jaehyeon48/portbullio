import express, { NextFunction, Request, Response } from 'express';
import { sessionService } from '@services';
import { sessionValidator } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.delete('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { uaat } = req.cookies;
			const logOutResult = await sessionService.deleteSession(uaat);
			if (!logOutResult) throw new Error('Log out failed');

			res.cookie('uaat', '', {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: -1
			});
			res.status(200).json({ logOutResult });
		} catch (error) {
			next(error);
		}
	});

	return router;
};
