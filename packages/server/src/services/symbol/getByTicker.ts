import prisma from '@lib/prisma';

export default async function getByTicker(tickerQuery: string) {
	const tickers = await prisma.symbol.findMany({
		where: { ticker: { startsWith: tickerQuery } }
	});
	return tickers;
}
