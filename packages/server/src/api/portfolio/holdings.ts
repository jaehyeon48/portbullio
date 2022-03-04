import express, { NextFunction, Request, Response } from 'express';
import { StockTransactionType } from '@portbullio/shared/src/types';
import { sessionValidator } from '@middlewares';
import * as stockTransactionService from '@services/stockTransaction';

interface PortfolioIdParam {
	portfolioId: string;
}

interface StockTransactionReqBody {
	ticker: string;
	price: number;
	quantity: number;
	memo?: string;
	type: StockTransactionType;
	isRealized: boolean;
}

export default (): express.Router => {
	const router = express.Router();

	router.post(
		'/:portfolioId/holdings',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const {
				ticker,
				price,
				quantity,
				memo = '',
				type,
				isRealized
			} = req.body as unknown as StockTransactionReqBody;

			try {
				const newStockTransactionId = await stockTransactionService.addStockTransaction({
					portfolioId: Number(portfolioId),
					ticker,
					price,
					quantity,
					memo,
					type,
					isRealized
				});
				res.status(201).json({ newStockTransactionId });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
