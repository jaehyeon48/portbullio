import express, { NextFunction, Request, Response } from 'express';
import * as cashService from '@services/cash';

interface PortfolioIdParam {
	portfolioId: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/:portfolioId/cash', async (req: Request, res: Response, next: NextFunction) => {
		const { portfolioId } = req.params as unknown as PortfolioIdParam;

		try {
			const cashTransactions = await cashService.getCashTransactions(Number(portfolioId));
			res.json({ cashTransactions });
		} catch (error) {
			next(error);
		}
	});

	return router;
};
