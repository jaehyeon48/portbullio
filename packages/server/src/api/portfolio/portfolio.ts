import express, { NextFunction, Request, Response } from 'express';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import * as portfolioService from '@services/portfolio';
import { sessionValidator } from '@middlewares';

interface NewPortfolioReqBody {
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

interface GetPortfolioReqQuery {
	portfolioId: string;
}

const MAX_PORTFOLIO_NAME_LENGTH = 20;

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		const { portfolioId } = req.query as unknown as GetPortfolioReqQuery;
		const { userId } = res.locals;
		try {
			const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
			if (!portfolio) {
				res.status(404).json({ error: 'Portfolio not found.' });
				return;
			}
			res.status(200).json({ portfolio });
		} catch (error) {
			next(error);
		}
	});

	router.get('/list', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = res.locals;
		try {
			const portfolios = await portfolioService.getPortfolios(Number(userId));
			if (!portfolios) {
				res.status(404).json({ error: 'Portfolio not found.' });
				return;
			}
			res.status(200).json({ portfolios });
		} catch (error) {
			next(error);
		}
	});

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
