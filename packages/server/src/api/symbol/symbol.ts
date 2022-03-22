import express, { NextFunction, Request, Response } from 'express';
import { sessionValidator } from '@middlewares';
import * as stockMetaService from '@services/stockMeta';

interface SearchQuery {
	query: string;
}

interface SectorQuery {
	query: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/', async (req: Request, res: Response, next: NextFunction) => {
		const { query } = req.query as unknown as SearchQuery;
		const lowerCasedQuery = query.toLowerCase();
		try {
			const tickerResult = await stockMetaService.getByTicker(lowerCasedQuery);
			const nameResult = await stockMetaService.getByName(lowerCasedQuery);
			res.json([...tickerResult, ...nameResult]);
		} catch (error) {
			next(error);
		}
	});

	router.get(
		'/sectors',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { query } = req.query as unknown as SectorQuery;
			const tickers = JSON.parse(decodeURIComponent(query)) as string[];
			try {
				const sectors = await stockMetaService.getSectors(tickers);
				res.json(sectors);
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
