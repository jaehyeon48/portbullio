import prisma from '@lib/prisma';
import { PortfolioPrivacy } from '@prisma/client';

export async function editPortfolioName(portfolioId: number, newName: string) {
	const modifiedPortfolio = await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { name: newName }
	});
	return modifiedPortfolio;
}

export async function editPortfolioPrivacy(portfolioId: number, newPrivacy: PortfolioPrivacy) {
	const modifiedPortfolio = await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { privacy: newPrivacy }
	});
	return modifiedPortfolio;
}
