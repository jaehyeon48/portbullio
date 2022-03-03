import prisma from '@lib/prisma';

export default async function getByName(nameQuery: string) {
	const tickers = await prisma.symbol.findMany({
		where: { name: { startsWith: nameQuery } }
	});
	return tickers;
}
