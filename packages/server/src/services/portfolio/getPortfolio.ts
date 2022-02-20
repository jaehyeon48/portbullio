import prisma from '@lib/prisma';

export async function getPortfolio(portfolioId: number, userId: number) {
	const portfolio = await prisma.portfolio.findFirst({
		where: { id: portfolioId, userId }
	});
	return portfolio;
}

export async function getPortfolios(userId: number) {
	const portfolios = await prisma.portfolio.findMany({
		where: { userId }
	});
	return portfolios;
}
