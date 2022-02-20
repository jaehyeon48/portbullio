import express, { NextFunction, Request, Response } from 'express';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import * as portfolioService from '@services/portfolio';
import { sessionValidator } from '@middlewares';

interface NewPortfolioReqBody {
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

const MAX_PORTFOLIO_NAME_LENGTH = 20;

export default (): express.Router => {
	const router = express.Router();

	router.post('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		const { portfolioName, privacy } = req.body as unknown as NewPortfolioReqBody;

		if (portfolioName.length > MAX_PORTFOLIO_NAME_LENGTH) {
			res
				.status(400)
				.json({ error: `Portfolio name's length must be shorter than or equal to 20.` });
			return;
		}

		try {
			const { userId } = res.locals;
			const newPortfolioId = await portfolioService.createPortfolio({
				userId: Number(userId),
				portfolioName,
				privacy
			});
			res.status(201).json({ newPortfolioId });
		} catch (error) {
			next(error);
		}
	});

	return router;
};
