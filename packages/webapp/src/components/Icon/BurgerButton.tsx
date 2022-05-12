import { IconProps } from '@types';
import SVG from '../SVG';

export default function BurgerButton({ width = 48, height = 48, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 48 48" fill={fill} aria-label="icon">
			<path
				d="M7.95001 35.95H39.95M7.95001 11.95H39.95H7.95001ZM7.95001 23.95H39.95H7.95001Z"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SVG>
	);
}
