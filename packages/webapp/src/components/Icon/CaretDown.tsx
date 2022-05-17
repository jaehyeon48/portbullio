import { IconProps } from '@types';
import SVG from '../SVG';

export default function CaretDown({ width = 14, height = 14, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-label="caret down icon">
			<path d="m0 6.4l12 12l12-12z" />
		</SVG>
	);
}
