import { SyntheticEvent } from 'react';
import {
	Pencil as PencilIcon,
	TrashCan as TrashCanIcon,
	StickyNote as StickyNoteIcon
} from '@components/Icons';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import ListItems from '@components/ListPage/ListItems';
import { EmptyListNotice, ListItem } from '@components/ListPage/styles';
import { useSelectedPortfolioId } from '@components/SelectPortfolio/useSelectedPortfolioId';
import { useModal } from '@hooks/Modal';
import { formatDate, formatCurrency, formatNum } from '@utils';
import * as Style from './styles';
import StockMemoEditPage from '../ModalPage/StockMemoEdit';
import EditStockTransactionPage from '../ModalPage/EditStockTransaction';
import DeleteStockTransactionConfirmPage from '../ModalPage/DeleteStockTransactionConfirm';

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

interface OpenEditModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	date: string;
}

interface OpenDeleteModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	quantityToDelete: number;
	type: StockTransactionType;
}

export default function StockTransactionList({ stockTransactionList, isLoading }: Props) {
	const { openModal } = useModal();
	const portfolioId = useSelectedPortfolioId();

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

	function handleOpenEditTransactionModal({
		e,
		stockTransactionId,
		ticker,
		price,
		quantity,
		type,
		date
	}: OpenEditModalProps) {
		openModal(
			e,
			<EditStockTransactionPage
				stockTransactionId={stockTransactionId}
				portfolioId={portfolioId}
				initialInputs={{ ticker, price, quantity, type, date }}
			/>
		);
	}

	function handleOpenDeleteConfirmModal({
		e,
		stockTransactionId,
		ticker,
		quantityToDelete,
		type
	}: OpenDeleteModalProps) {
		openModal(
			e,
			<DeleteStockTransactionConfirmPage
				stockTransactionId={stockTransactionId}
				ticker={ticker}
				quantityToDelete={quantityToDelete}
				type={type}
			/>
		);
	}

	if (isLoading) {
		return <EmptyListNotice>?????? ???...</EmptyListNotice>;
	}

	return (
		<>
			<ListItems
				isListEmpty={!stockTransactionList || stockTransactionList.length === 0}
				emptyListNoticeMessage="?????? ????????? ????????????."
			>
				{stockTransactionList?.map(
					({ id, createdAt, ticker, transactionType, price, quantity, memo, avgBuyCost }) => {
						const realizedProfitLossPercent = avgBuyCost
							? ((price - avgBuyCost) / avgBuyCost) * 100
							: 0;

						return (
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
										isMemoExist={!!memo}
										onClick={e => handleOpenMemoModal({ e, stockTransactionId: id, ticker, memo })}
									>
										<StickyNoteIcon />
									</Style.MemoOpenButton>
								</Style.MemoSection>
								<Style.RealizedProfitAndLossSection value={avgBuyCost ? price - avgBuyCost : 0}>
									{avgBuyCost &&
										formatCurrency((price - avgBuyCost) * quantity, 'usd', {
											signDisplay: 'never'
										})}
									{avgBuyCost &&
										` (${formatNum(realizedProfitLossPercent, { signDisplay: 'exceptZero' })}%)`}
								</Style.RealizedProfitAndLossSection>
								<Style.StockTransactionActionsSection>
									<Style.StockTransactionEditButton
										type="button"
										onClick={e =>
											handleOpenEditTransactionModal({
												e,
												stockTransactionId: id,
												ticker,
												price,
												quantity,
												type: transactionType,
												date: createdAt as unknown as string
											})
										}
									>
										<PencilIcon width={16} height={16} />
										?????? ??????
									</Style.StockTransactionEditButton>
									<Style.StockTransactionDeleteButton
										type="button"
										onClick={e =>
											handleOpenDeleteConfirmModal({
												e,
												stockTransactionId: id,
												ticker,
												quantityToDelete: quantity,
												type: transactionType
											})
										}
									>
										<TrashCanIcon width={16} height={16} />
										??????
									</Style.StockTransactionDeleteButton>
								</Style.StockTransactionActionsSection>
							</ListItem>
						);
					}
				)}
			</ListItems>
		</>
	);
}

const stockTransactionTypeKor = {
	buy: '??????',
	sell: '??????'
} as const;
