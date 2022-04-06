import { createPortfolioResult } from '@lib/index';
import { createPortfolio } from '../createPortfolio';

test('createPortfolio test', async () => {
	const result = await createPortfolio({ portfolioName: 'test', privacy: 'public' });
	expect(result).toStrictEqual(createPortfolioResult);
});
