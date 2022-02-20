import prisma from '@lib/prisma';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';

interface NewPortfolioArgs {
	userId: number;
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

export default async function createPortfolio({
	userId,
	portfolioName,
	privacy
}: NewPortfolioArgs): Promise<number> {
	const newPortfolio = await prisma.portfolio.create({
		data: {
			userId,
			name: portfolioName,
			privacy
		}
	});
	return newPortfolio.id;
}
