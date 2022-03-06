import express, { NextFunction, Request, Response } from 'express';
import { StockTransactionType } from '@portbullio/shared/src/types';
import { sessionValidator } from '@middlewares';
import * as stockTransactionService from '@services/stockTransaction';

interface PortfolioIdParam {
	portfolioId: string;
}

interface StockTransactionIdParam {
	stockTransactionId: string;
}

interface GetStockTransactionOfATickerParam extends PortfolioIdParam {
	ticker: string;
}

interface AddStockTransactionReqBody {
	ticker: string;
	price: number;
	quantity: number;
	memo?: string;
	type: StockTransactionType;
	isRealized: boolean;
}

interface UpdateStockTransactionReqBody {
	price: number;
	quantity: number;
	type: StockTransactionType;
}

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/:portfolioId/holdings',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;

			try {
				const transactions = await stockTransactionService.getAllStockTransactions(
					Number(portfolioId)
				);

				const holdings = await stockTransactionService.calculateAvgCost(transactions);
				res.json({ holdings });
			} catch (error) {
				next(error);
			}
		}
	);

	router.get(
		'/:portfolioId/holdings/:ticker',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId, ticker } = req.params as unknown as GetStockTransactionOfATickerParam;

			try {
				const transactions = await stockTransactionService.getStockTransactionsOfATicker(
					Number(portfolioId),
					ticker
				);
				res.json({ transactions });
			} catch (error) {
				next(error);
			}
		}
	);

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
			} = req.body as unknown as AddStockTransactionReqBody;

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

	router.patch(
		'/holdings/:stockTransactionId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { stockTransactionId } = req.params as unknown as StockTransactionIdParam;
			const { price, quantity, type } = req.body as unknown as UpdateStockTransactionReqBody;

			try {
				await stockTransactionService.updateStockTransaction({
					stockTransactionId: Number(stockTransactionId),
					price,
					quantity,
					type
				});
				res.send();
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
