import CaretUp from '../Icon/CaretUp';
import CaretDown from '../Icon/CaretDown';

interface Props {
	value: number;
	width?: number;
	height?: number;
}

export default function DynamicCaret({ value, width, height }: Props) {
	if (value === 0) return null;

	return (
		<>
			{value > 0 ? (
				<CaretUp width={width} height={height} />
			) : (
				<CaretDown width={width} height={height} />
			)}
		</>
	);
}
