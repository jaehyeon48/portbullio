import prisma from '@lib/prisma';
import { CashTransactionType } from '@prisma/client';

interface AddCashTransactionArgs {
	portfolioId: number;
	amount: number;
	note?: string | null;
	type: CashTransactionType;
	date: string;
}

export default async function addCashTransaction({
	portfolioId,
	amount,
	note = null,
	type,
	date
}: AddCashTransactionArgs) {
	const newLog = await prisma.cashTransactionLog.create({
		data: {
			portfolioId,
			amount,
			note,
			transactionType: type,
			createdAt: new Date(date)
		}
	});
	return newLog;
}
