import prisma from '@lib/prisma';
import { CashTransactionType } from '@prisma/client';

interface EditCashTransactionArgs {
	cashTransactionId: number;
	amount: number;
	type: CashTransactionType;
	note?: string;
	date: string;
}

export default async function editCashTransaction({
	cashTransactionId,
	amount,
	type,
	note,
	date
}: EditCashTransactionArgs) {
	const editedCashTransaction = await prisma.cashTransactionLog.update({
		where: { id: cashTransactionId },
		data: {
			amount,
			transactionType: type,
			note,
			createdAt: new Date(date)
		}
	});
	return editedCashTransaction;
}
