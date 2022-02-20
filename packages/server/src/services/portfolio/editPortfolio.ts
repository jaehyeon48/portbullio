import prisma from '@lib/prisma';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';

export async function editPortfolioName(portfolioId: number, newName: string) {
	await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { name: newName }
	});
	return;
}

export async function editPortfolioPrivacy(portfolioId: number, newPrivacy: PortfolioPrivacy) {
	await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { privacy: newPrivacy }
	});
	return;
}
