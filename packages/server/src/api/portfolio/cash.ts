import express, { NextFunction, Request, Response } from 'express';
import * as cashService from '@services/cash';
import { sessionValidator } from '@middlewares';
import { CashTransactionType } from '@prisma/client';

interface PortfolioIdParam {
	portfolioId: string;
}

interface AddCashTransactionReqBody {
	amount: number;
	note?: string;
	type: CashTransactionType;
	date: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/:portfolioId/cash',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;

			try {
				const cashTransactions = await cashService.getCashTransactions(Number(portfolioId));
				res.json({ cashTransactions });
			} catch (error) {
				next(error);
			}
		}
	);

	router.post(
		'/:portfolioId/cash',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { amount, note, type, date } = req.body as unknown as AddCashTransactionReqBody;

			try {
				const newCashTransaction = await cashService.addCashTransaction({
					portfolioId: Number(portfolioId),
					amount,
					note,
					type,
					date
				});
				res.json({ newCashTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
