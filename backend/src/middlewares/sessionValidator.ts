import { Request, Response, NextFunction } from 'express';
import { sessionService } from '@services';

const sessionValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const sessionId = req.cookies.uaat;
		const userId = await sessionService.checkSession(sessionId);
		if (userId === undefined) throw Error('Invalid session');

		res.locals.userId = userId;
		next();
	} catch (error) {
		next(error);
	}
};

export default sessionValidator;
