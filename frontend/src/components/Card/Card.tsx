import { ReactNode } from 'react';
import Card from './style';

interface Props {
	width?: string;
	height?: string;
	ariaLabel?: string;
	children: ReactNode;
}

export default function ({ children, width, height, ariaLabel }: Props) {
	return (
		<Card _width={width} _height={height} aria-label={ariaLabel}>
			{children}
		</Card>
	);
}
