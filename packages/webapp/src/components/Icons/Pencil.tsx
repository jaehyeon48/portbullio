import { IconProps } from '@types';
import SVG from '../SVG';

export default function Pencil({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-label="icon">
			<path
				fill="currentColor"
				d="M8.707 19.707L18 10.414L13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586L19.414 9L21 7.414z"
			/>
		</SVG>
	);
}
