import express, { NextFunction, Request, Response } from 'express';
import * as stockMetaService from '@services/stockMeta';

interface SearchQuery {
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

	return router;
};
