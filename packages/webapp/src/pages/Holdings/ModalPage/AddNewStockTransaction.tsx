import { SyntheticEvent, useState } from 'react';
import { useToast } from 'super-simple-react-toast';
import { StockTransactionType } from '@prisma/client';
import TextInput from '@components/Form/TextInput';
import SearchStocks from '@components/SearchStocks';
import useHoldingsList from '@hooks/ReactQuery/useHoldingsList';
import useCashTransactionList from '@hooks/ReactQuery/useCashTransactionList';
import {
	isValidRealNumber,
	isValidInteger,
	datetimeLocalFormat,
	getHoldingOfTicker,
	calcTotalCashAmount,
	formatCurrency
} from '@utils';
import { CloseModalFn } from '@types';
import * as Style from './styles';
import useAddStockTransaction from '../queries/useAddStockTransaction';

interface Props {
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function AddNewStockTransaction({ portfolioId, closeFunction }: Props) {
	const toast = useToast();
	const holdingsList = useHoldingsList(portfolioId);
	const cashList = useCashTransactionList(portfolioId);
	const addStockTransactionMutation = useAddStockTransaction();
	const [transactionTypeInput, setTransactionTypeInput] = useState<StockTransactionType>('buy');
	const [relateCashInput, setRelateCashInput] = useState(false);
	const [tickerInput, setTickerInput] = useState('');
	const [priceInput, setPriceInput] = useState('');
	const [quantityInput, setQuantityInput] = useState('');
	const [dateInput, setDateInput] = useState(datetimeLocalFormat());

	function handleChangeTransactionType(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setTransactionTypeInput(target.value as StockTransactionType);
	}

	function handleRelateCash() {
		setRelateCashInput(prev => !prev);
	}

	function handleChangePrice(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!isValidRealNumber(target.value)) return;
		setPriceInput(target.value);
	}

	function handleChangeQuantity(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!isValidInteger(target.value)) return;
		setQuantityInput(target.value);
	}

	function handleChangeDate(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setDateInput(target.value);
	}

	function handleClickSearchStockItem(ticker: string) {
		setTickerInput(ticker);
	}

	function isValidSellQuantity(ticker: string, sellQuantity: number) {
		const holdingInfo = getHoldingOfTicker(holdingsList.data, ticker);
		if (!holdingInfo) return false;
		return holdingInfo.buyQuantity - holdingInfo.sellQuantity >= sellQuantity;
	}

	function isCashAmountEnough() {
		const totalCashAmount = calcTotalCashAmount(cashList.data);
		return totalCashAmount >= Number(priceInput) * Number(quantityInput);
	}

	function validateInputs() {
		if (tickerInput === '') {
			toast.error({ message: '????????? ????????? ?????????.' });
			return false;
		}

		if (priceInput === '') {
			toast.error({ message: '????????? ????????? ?????????.' });
			return false;
		}

		if (quantityInput === '') {
			toast.error({ message: '????????? ????????? ?????????.' });
			return false;
		}

		if (
			transactionTypeInput === 'sell' &&
			!isValidSellQuantity(tickerInput, Number(quantityInput))
		) {
			toast.error({ message: '?????? ????????? ?????? ?????? ???????????? ????????????.' });
			return false;
		}

		if (relateCashInput && transactionTypeInput === 'buy' && !isCashAmountEnough()) {
			toast.error({ message: '?????? ???????????? ???????????????.' });
			return false;
		}
		return true;
	}

	async function handleSubmitNewStockTransaction(e: SyntheticEvent) {
		e.preventDefault();
		if (!validateInputs()) return;

		const avgBuyCost =
			transactionTypeInput === 'buy'
				? undefined
				: getHoldingOfTicker(holdingsList.data, tickerInput)?.avgCost!;

		addStockTransactionMutation.mutate(
			{
				portfolioId,
				ticker: tickerInput,
				price: Number(priceInput),
				quantity: Number(quantityInput),
				type: transactionTypeInput,
				relateCash: relateCashInput,
				avgBuyCost,
				date: dateInput
			},
			{
				onSuccess: () => {
					toast.success({ message: '??????????????? ??????????????? ??????????????????.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '????????? ??????????????????. ?????? ????????? ?????????.' })
			}
		);
	}

	return (
		<Style.Container>
			<Style.Header>?????? ???????????? ??????</Style.Header>
			<SearchStocks onResultClick={handleClickSearchStockItem} />
			<Style.Form onSubmit={handleSubmitNewStockTransaction}>
				<Style.RadioInputContainer>
					<Style.RadioInput
						id="radio-buy-stock"
						type="radio"
						name="stock-transaction-type"
						value="buy"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'buy'}
					/>
					<Style.RadioInputLabel htmlFor="radio-buy-stock">??????</Style.RadioInputLabel>
					<Style.RadioInput
						id="radio-sell-stock"
						type="radio"
						name="stock-transaction-type"
						value="sell"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sell'}
					/>
					<Style.RadioInputLabel htmlFor="radio-sell-stock">??????</Style.RadioInputLabel>
				</Style.RadioInputContainer>
				<Style.RelateCashSection>
					<input
						id="relate-cash"
						type="checkbox"
						checked={relateCashInput}
						onChange={handleRelateCash}
					/>
					<label htmlFor="relate-cash">
						{transactionTypeInput === 'buy'
							? '?????????????????? ???????????? ????????????'
							: '??????????????? ???????????? ????????????'}
					</label>
				</Style.RelateCashSection>
				<Style.CurrentTotalCashSection>
					<span>?????? ????????????: </span>
					{formatCurrency(calcTotalCashAmount(cashList.data), 'usd')}
				</Style.CurrentTotalCashSection>
				<TextInput
					htmlFor="new-stock-transaction-ticker"
					labelName="?????? ??????"
					readOnly
					value={tickerInput}
				/>
				<TextInput
					htmlFor="new-stock-transaction-price"
					labelName="??????"
					value={priceInput}
					handleChange={handleChangePrice}
				/>
				<TextInput
					htmlFor="new-stock-transaction-quantity"
					labelName="??????"
					value={quantityInput}
					handleChange={handleChangeQuantity}
				/>
				<TextInput
					type="datetime-local"
					htmlFor="new-stock-transaction-date"
					labelName="??????"
					value={dateInput}
					handleChange={handleChangeDate}
				/>
				<Style.TotalCostSection>
					??? ??????: {formatCurrency(Number(priceInput) * Number(quantityInput), 'usd')}
				</Style.TotalCostSection>
				<Style.SubmitButton type="submit" backgroundColor="var(--primary)">
					????????????
				</Style.SubmitButton>
			</Style.Form>
		</Style.Container>
	);
}
