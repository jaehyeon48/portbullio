import { SyntheticEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { SelectNumOfItemsContainer, Select } from './style';

interface Props {
	numOfItems: number;
	maxNumOfOptions: number;
	optionValue: number;
	setterFn: Dispatch<SetStateAction<number>>;
	selectElementId: string;
	labelText: string;
}

export default function SelectNumOfItems({
	numOfItems,
	maxNumOfOptions,
	optionValue,
	setterFn,
	selectElementId,
	labelText
}: Props) {
	const numOfOptions = Math.min(numOfItems, maxNumOfOptions);

	useEffect(() => {
		setterFn(numOfOptions);
	}, [setterFn, numOfOptions]);

	function handleChangeSelect(e: SyntheticEvent) {
		const target = e.target as HTMLSelectElement;
		setterFn(Number(target.value));
	}

	return (
		<SelectNumOfItemsContainer>
			<label htmlFor={selectElementId}>{labelText}</label>
			<Select id={selectElementId} value={optionValue} onChange={handleChangeSelect}>
				{Array.from({ length: numOfOptions }, (_, i) => i + 1).map(val => (
					<option key={val} value={val}>
						{val}
					</option>
				))}
			</Select>
		</SelectNumOfItemsContainer>
	);
}