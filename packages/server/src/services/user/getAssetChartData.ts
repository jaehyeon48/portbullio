import { DailyAssetRecord } from '@prisma/client';
import { prisma, logger } from '@lib/index';

interface GetAssetChartDataParam {
	userId: number;
	portfolioId: number;
	startDate: Date;
	count: number;
}

export default async function getAssetChartData({
	userId,
	portfolioId,
	startDate,
	count
}: GetAssetChartDataParam): Promise<DailyAssetRecord[]> {
	try {
		const data = await prisma.dailyAssetRecord.findMany({
			where: {
				userId,
				portfolioId,
				createdAt: { lt: startDate }
			},
			orderBy: { createdAt: 'desc' },
			take: count
		});

		return data;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
