import prisma from '@lib/prisma';

export default async function getByTicker(tickerQuery: string) {
	const tickers = await prisma.stockMeta.findMany({
		where: { ticker: { startsWith: tickerQuery } }
	});
	return tickers;
}
