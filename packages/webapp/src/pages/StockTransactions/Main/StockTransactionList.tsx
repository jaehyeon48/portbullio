import { SyntheticEvent } from 'react';
import { Pencil as PencilIcon, TrashCan as TrashCanIcon } from '@components/Icon';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import { formatDate, formatCurrency, formatNum } from '@utils';
import { useModal } from '@hooks/Modal';
import {
	ListItems,
	ListItem,
	EmptyListNotice,
	StickyNote as StickyNoteIcon,
	DynamicCaret,
	useSelectPortfolioId
} from '@components/index';
import * as Style from './styles';
import StockMemoEditPage from '../ModalPage/StockMemoEdit';

interface Props {
	stockTransactionList: StockTransactionLog[] | undefined;
	isLoading: boolean;
}

interface OpenMemoModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	memo: string | null;
}

export default function StockTransactionList({ stockTransactionList, isLoading }: Props) {
	const { openModal } = useModal();
	const portfolioId = useSelectPortfolioId() ?? 0;

	function handleOpenMemoModal({ e, stockTransactionId, ticker, memo }: OpenMemoModalProps) {
		openModal(
			e,
			<StockMemoEditPage
				portfolioId={portfolioId}
				ticker={ticker}
				stockTransactionId={stockTransactionId}
				memo={memo}
			/>
		);
	}

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<>
			<ListItems
				isListEmpty={!stockTransactionList || stockTransactionList.length === 0}
				emptyListNoticeMessage="거래 내역이 없습니다."
			>
				{stockTransactionList?.map(
					({ id, createdAt, ticker, transactionType, price, quantity, memo, priceDiff }) => (
						<ListItem key={id}>
							<Style.DateSection>{formatDate(createdAt as unknown as string)}</Style.DateSection>
							<Style.TransactionTypeSection>
								{stockTransactionTypeKor[transactionType as keyof typeof StockTransactionType]}
							</Style.TransactionTypeSection>
							<Style.PriceSection>{formatCurrency(price, 'usd')}</Style.PriceSection>
							<Style.QuantitySection>{formatNum(quantity)}</Style.QuantitySection>
							<Style.MemoSection>
								<Style.MemoOpenButton
									type="button"
									onClick={e => handleOpenMemoModal({ e, stockTransactionId: id, ticker, memo })}
								>
									<StickyNoteIcon />
								</Style.MemoOpenButton>
							</Style.MemoSection>
							<Style.RealizedProfitAndLossSection value={priceDiff ?? 0}>
								<DynamicCaret value={priceDiff ?? 0} />
								{priceDiff && priceDiff * quantity}
							</Style.RealizedProfitAndLossSection>
							<Style.StockTransactionActionsSection>
								<Style.StockTransactionEditButton type="button">
									<PencilIcon width={16} height={16} />
									내역 수정
								</Style.StockTransactionEditButton>
								<Style.StockTransactionDeleteButton type="button">
									<TrashCanIcon width={16} height={16} />
									삭제
								</Style.StockTransactionDeleteButton>
							</Style.StockTransactionActionsSection>
						</ListItem>
					)
				)}
			</ListItems>
		</>
	);
}

const stockTransactionTypeKor = {
	buy: '매수',
	sell: '매도'
} as const;
