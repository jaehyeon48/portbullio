import { SyntheticEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { StockTransactionType } from '@portbullio/shared/src/types';
import { SearchStocks, TextInput } from '@components/index';
import { addStockTransaction } from '@api/holdings';
import { CloseModalFn } from '@types';
import { isValidRealNumber, isValidInteger } from '@utils';
import toast from '@lib/toast';
import * as Style from './styles';

interface Props {
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function AddNewStockTransaction({ portfolioId, closeFunction }: Props) {
	const queryClient = useQueryClient();
	const [transactionTypeInput, setTransactionTypeInput] = useState<StockTransactionType>('buy');
	const [tickerInput, setTickerInput] = useState('');
	const [priceInput, setPriceInput] = useState('');
	const [quantityInput, setQuantityInput] = useState('');

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

	function handleClickSearchStockItem(ticker: string) {
		setTickerInput(ticker);
	}

	function validateInputs() {
		if (tickerInput === '') {
			toast.error({ message: '티커를 입력해 주세요.' });
			return false;
		}

		if (priceInput === '') {
			toast.error({ message: '가격을 입력해 주세요.' });
			return false;
		}

		if (quantityInput === '') {
			toast.error({ message: '수량을 입력해 주세요.' });
			return false;
		}

		return true;
	}

	async function handleSubmitNewStockTransaction(e: SyntheticEvent) {
		e.preventDefault();
		if (!validateInputs()) return;

		const addRes = await addStockTransaction({
			portfolioId,
			ticker: tickerInput,
			price: Number(priceInput),
			quantity: Number(quantityInput),
			type: transactionTypeInput
		});

		if (!addRes) {
			toast.error({ message: '오류가 발생했습니다. 다시 시도해 주세요.' });
			return;
		}

		toast.success({ message: '성공적으로 거래내역을 추가했습니다.' });
		queryClient.invalidateQueries(`holdingsOf${portfolioId}`);
		closeFunction!(e, false);
	}

	return (
		<Style.Container>
			<Style.Header>거래내역 추가</Style.Header>
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
					<Style.RadioInputLabel htmlFor="radio-buy-stock">매수</Style.RadioInputLabel>
					<Style.RadioInput
						id="radio-sell-stock"
						type="radio"
						name="stock-transaction-type"
						value="sell"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sell'}
					/>
					<Style.RadioInputLabel htmlFor="radio-sell-stock">매도</Style.RadioInputLabel>
				</Style.RadioInputContainer>
				<TextInput
					htmlFor="new-stock-transaction-ticker"
					labelName="종목 티커"
					readOnly
					value={tickerInput}
				/>
				<TextInput
					htmlFor="new-stock-transaction-price"
					labelName="가격"
					value={priceInput}
					handleChange={handleChangePrice}
				/>
				<TextInput
					htmlFor="new-stock-transaction-quantity"
					labelName="수량"
					value={quantityInput}
					handleChange={handleChangeQuantity}
				/>
				<Style.SubmitButton type="submit" backgroundColor="var(--primary)">
					추가하기
				</Style.SubmitButton>
			</Style.Form>
		</Style.Container>
	);
}
