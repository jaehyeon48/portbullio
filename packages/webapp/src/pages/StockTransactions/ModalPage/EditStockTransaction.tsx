import { SyntheticEvent, useState } from 'react';
import { useToast } from 'super-simple-react-toast';
import { StockTransactionType } from '@prisma/client';
import TextInput from '@components/Form/TextInput';
import useHoldingsList from '@hooks/ReactQuery/useHoldingsList';
import { CloseModalFn } from '@types';
import { isValidRealNumber, isValidInteger, getHoldingOfTicker, datetimeLocalFormat } from '@utils';
import * as Style from './styles';
import useEditStockTransaction from '../queries/useEditStockTransaction';

interface InitialInputValues {
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	date: string;
}

interface Props {
	stockTransactionId: number;
	portfolioId: number;
	initialInputs: InitialInputValues;
	closeFunction?: CloseModalFn;
}

export default function EditStockTransaction({
	stockTransactionId,
	portfolioId,
	initialInputs,
	closeFunction
}: Props) {
	const toast = useToast();
	const holdingsList = useHoldingsList(portfolioId);
	const editStockTransactionMutation = useEditStockTransaction();
	const [transactionTypeInput, setTransactionTypeInput] = useState<StockTransactionType>(
		initialInputs.type
	);
	const [priceInput, setPriceInput] = useState(initialInputs.price.toString());
	const [quantityInput, setQuantityInput] = useState(initialInputs.quantity.toString());
	const [dateInput, setDateInput] = useState(initialInputs.date);

	function handleChangeTransactionType(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setTransactionTypeInput(target.value as StockTransactionType);
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

	function isValidSellQuantity(sellQuantity: number) {
		const holdingInfo = getHoldingOfTicker(holdingsList.data, initialInputs.ticker);
		if (!holdingInfo) return false;
		return holdingInfo.buyQuantity - holdingInfo.sellQuantity >= sellQuantity;
	}

	function validateInputs() {
		if (priceInput === '') {
			toast.error({ message: '????????? ????????? ?????????.' });
			return false;
		}

		if (quantityInput === '') {
			toast.error({ message: '????????? ????????? ?????????.' });
			return false;
		}

		if (transactionTypeInput === 'sell' && !isValidSellQuantity(Number(quantityInput))) {
			toast.error({ message: '?????? ????????? ?????? ?????? ???????????? ????????????.' });
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
				: getHoldingOfTicker(holdingsList.data, initialInputs.ticker)?.avgCost!;

		editStockTransactionMutation.mutate(
			{
				portfolioId,
				stockTransactionId,
				ticker: initialInputs.ticker,
				price: Number(priceInput),
				quantity: Number(quantityInput),
				type: transactionTypeInput,
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
		<Style.EditTransactionContainer>
			<Style.EditTransactionHeader>???????????? ??????</Style.EditTransactionHeader>
			<Style.EditTransactionForm onSubmit={handleSubmitNewStockTransaction}>
				<Style.EditTransactionRadioInputContainer>
					<Style.EditTransactionRadioInput
						id="radio-buy-stock"
						type="radio"
						name="stock-transaction-type"
						value="buy"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'buy'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-buy-stock">
						??????
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-sell-stock"
						type="radio"
						name="stock-transaction-type"
						value="sell"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sell'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-sell-stock">
						??????
					</Style.EditTransactionRadioInputLabel>
				</Style.EditTransactionRadioInputContainer>
				<TextInput
					htmlFor="edit-stock-transaction-ticker"
					labelName="?????? ??????"
					readOnly
					value={initialInputs.ticker}
				/>
				<TextInput
					htmlFor="edit-stock-transaction-price"
					labelName="??????"
					value={priceInput}
					handleChange={handleChangePrice}
				/>
				<TextInput
					htmlFor="edit-stock-transaction-quantity"
					labelName="??????"
					value={quantityInput}
					handleChange={handleChangeQuantity}
				/>
				<TextInput
					type="datetime-local"
					htmlFor="edit-stock-transaction-date"
					labelName="??????"
					value={datetimeLocalFormat(dateInput)}
					handleChange={handleChangeDate}
				/>
				<Style.EditTransactionSubmitButton type="submit" backgroundColor="var(--deepOrange)">
					????????????
				</Style.EditTransactionSubmitButton>
			</Style.EditTransactionForm>
		</Style.EditTransactionContainer>
	);
}
