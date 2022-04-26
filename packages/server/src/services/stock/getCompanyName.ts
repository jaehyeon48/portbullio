import prisma from '@lib/prisma';

export default async function getCompanyName(ticker: string) {
	const companyName = await prisma.stockMeta.findFirst({
		where: { ticker },
		select: { name: true }
	});
	return companyName;
}
