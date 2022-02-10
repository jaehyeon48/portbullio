import { CaretUp, CaretDown } from '@components/index';
import CaretContainer from './styles';

interface Props {
	value: number;
	width?: number;
	height?: number;
	marginTop?: number;
}

export default function DynamicCaret({ value, width, height, marginTop = 2 }: Props) {
	if (value === 0) return null;

	return (
		<CaretContainer marginTop={marginTop}>
			{value > 0 ? (
				<CaretUp width={width} height={height} />
			) : (
				<CaretDown width={width} height={height} />
			)}
		</CaretContainer>
	);
}
