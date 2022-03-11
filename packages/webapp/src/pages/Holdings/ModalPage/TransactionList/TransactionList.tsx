import { useState } from 'react';
import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import { StickyNote as StickyNoteIcon, SquareFill as SquareFillIcon } from '@components/Icon';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import { formatDate, formatCurrency, formatNum } from '@utils';
import * as Style from './styles';
import TransactionMemo from './TransactionMemo';

interface Props {
	portfolioId: number;
	ticker: string;
	transactionList: StockTransactionLog[] | undefined;
	isLoading: boolean;
}

export default function TransactionList({
	portfolioId,
	ticker,
	transactionList,
	isLoading
}: Props) {
	const [currentOpenedMemoId, setCurrentOpenedMemoId] = useState(0);
	const [memoContent, setMemoContent] = useState('');

	function toggleOpenMemo(id: number, content: string) {
		if (id === currentOpenedMemoId) {
			setCurrentOpenedMemoId(0);
			setMemoContent('');
			return;
		}

		setCurrentOpenedMemoId(id);
		setMemoContent(content);
	}

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<>
			<ListItems
				isListEmpty={!transactionList || transactionList.length === 0}
				emptyListNoticeMessage="거래 내역이 없습니다."
				maxHeight="30vh"
			>
				{transactionList?.map(({ id, createdAt, transactionType, price, quantity, memo }) => (
					<ListItem key={id}>
						<Style.DateSection>{formatDate(createdAt as unknown as string)}</Style.DateSection>
						<Style.TransactionTypeSection>
							{stockTransactionTypeKor[transactionType as keyof typeof StockTransactionType]}
						</Style.TransactionTypeSection>
						<Style.PriceSection>{formatCurrency(price, 'usd')}</Style.PriceSection>
						<Style.QuantitySection>{formatNum(quantity)}</Style.QuantitySection>
						<Style.MemoSection>
							<Style.MemoOpenButton type="button" onClick={() => toggleOpenMemo(id, memo ?? '')}>
								{id === currentOpenedMemoId ? <SquareFillIcon /> : <StickyNoteIcon />}
							</Style.MemoOpenButton>
						</Style.MemoSection>
					</ListItem>
				))}
			</ListItems>
			<TransactionMemo
				key={currentOpenedMemoId}
				portfolioId={portfolioId}
				ticker={ticker}
				stockTransactionId={currentOpenedMemoId}
				memoContent={memoContent}
				closeMemoInput={() => setCurrentOpenedMemoId(0)}
			/>
		</>
	);
}

const stockTransactionTypeKor = {
	buy: '매수',
	sell: '매도'
} as const;
