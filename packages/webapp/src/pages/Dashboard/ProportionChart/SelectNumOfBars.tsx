import { SyntheticEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useHoldingsList } from '@hooks/index';
import { useSelectPortfolioId } from '@components/index';
import { SelectNumOfBarsContainer, Select } from '../style';
import { MAX_NUM_OF_BARS } from './constants';

interface Props {
	numOfBars: number;
	setterFn: Dispatch<SetStateAction<number>>;
}

export default function SelectNumOfBars({ numOfBars, setterFn }: Props) {
	const portfolioId = useSelectPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const numOfOptions = Math.min((holdingsList.data?.length ?? 0) + 1, MAX_NUM_OF_BARS);

	useEffect(() => {
		setterFn(numOfOptions);
	}, [setterFn, numOfOptions]);

	function handleChangeSelect(e: SyntheticEvent) {
		const target = e.target as HTMLSelectElement;
		setterFn(Number(target.value));
	}

	return (
		<SelectNumOfBarsContainer>
			<p>종목 개수: </p>
			<Select value={numOfBars} onChange={handleChangeSelect}>
				{Array.from({ length: numOfOptions }, (_, i) => i + 1).map(val => (
					<option key={val} value={val}>
						{val}
					</option>
				))}
			</Select>
		</SelectNumOfBarsContainer>
	);
}
