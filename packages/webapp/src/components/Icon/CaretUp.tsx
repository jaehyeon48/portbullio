import { IconProps } from '@types';
import SVG from '../SVG';

export default function CaretUp({ width = 14, height = 14, fill = 'primary' }: IconProps) {
	return (
		<SVG
			width={width}
			height={height}
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
			fill={fill}
			aria-label="caret up icon"
		>
			<path d="m24 18.4l-12-12l-12 12z" />
		</SVG>
	);
}
