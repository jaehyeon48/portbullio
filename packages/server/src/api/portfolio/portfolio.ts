import express, { NextFunction, Request, Response } from 'express';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import { MAX_PORTFOLIO_NAME_LENGTH } from '@portbullio/shared/src/constants';
import * as portfolioService from '@services/portfolio';
import { sessionValidator } from '@middlewares';

interface PortfolioIdParam {
	portfolioId: string;
}

interface NewPortfolioReqBody {
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

interface EditPortfolioNameReqBody {
	newPortfolioName: string;
}

interface EditDefaultPortfolioParam {
	prevPortfolioId: string;
}

interface EditDefaultPortfolioReqBody {
	newPortfolioId: string;
}

interface EditPortfolioPrivacyReqBody {
	newPrivacy: PortfolioPrivacy;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/all', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
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

	router.get(
		'/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = res.locals;

			try {
				const defaultPortfolioId = await portfolioService.getDefaultPortfolio(Number(userId));
				res.json({ defaultPortfolioId });
			} catch (error) {
				next(error);
			}
		}
	);

	router.get(
		'/:portfolioId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
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
		}
	);

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

	router.post(
		'/:portfolioId/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { userId } = res.locals;

			try {
				const doesUserHavePortfolio = !!(await portfolioService.getPortfolio(
					Number(portfolioId),
					Number(userId)
				));
				if (!doesUserHavePortfolio) {
					res.status(400).json({ error: 'User does not have the portfolio.' });
					return;
				}
				await portfolioService.setDefaultPortfolio(Number(portfolioId), Number(userId));
				res.send();
			} catch (error) {
				next(error);
			}
		}
	);

	router.put(
		'/:portfolioId/name',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { newPortfolioName } = req.body as unknown as EditPortfolioNameReqBody;
			const { userId } = res.locals;

			if (newPortfolioName.length > MAX_PORTFOLIO_NAME_LENGTH) {
				res
					.status(400)
					.json({ error: `Portfolio name's length must be shorter than or equal to 20.` });
				return;
			}

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}
				await portfolioService.editPortfolioName(Number(portfolioId), newPortfolioName);
				res.status(200).json({ newPortfolioName });
			} catch (error) {
				next(error);
			}
		}
	);

	router.put(
		'/:portfolioId/privacy',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { newPrivacy } = req.body as unknown as EditPortfolioPrivacyReqBody;
			const { userId } = res.locals;

			if (newPrivacy !== 'public' && newPrivacy !== 'private') {
				res.status(400).json({ error: 'Invalid privacy type.' });
				return;
			}

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}
				await portfolioService.editPortfolioPrivacy(Number(portfolioId), newPrivacy);
				res.status(200).json({ newPrivacy });
			} catch (error) {
				next(error);
			}
		}
	);

	router.put(
		'/:prevPortfolioId/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { prevPortfolioId } = req.params as unknown as EditDefaultPortfolioParam;
			const { newPortfolioId } = req.body as unknown as EditDefaultPortfolioReqBody;
			const { userId } = res.locals;

			try {
				const isDefaultPortfolioExist = !!(await portfolioService.getDefaultPortfolio(
					Number(userId)
				));
				if (!isDefaultPortfolioExist) {
					res.status(400).json({ error: 'User does not have any default portfolios' });
					return;
				}

				const doesUserHavePortfolio = !!(await portfolioService.getPortfolio(
					Number(newPortfolioId),
					Number(userId)
				));
				if (!doesUserHavePortfolio) {
					res.status(400).json({ error: 'User does not have the portfolio.' });
					return;
				}
				await portfolioService.editDefaultPortfolio(
					Number(prevPortfolioId),
					Number(newPortfolioId),
					Number(userId)
				);
				res.send();
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete(
		'/:portfolioId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { userId } = res.locals;

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}

				const deletedPortfolio = await portfolioService.deletePortfolio(Number(portfolioId));
				res.status(200).json({ deletedId: deletedPortfolio.id });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
