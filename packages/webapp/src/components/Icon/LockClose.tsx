import { IconProps } from '@types';
import SVG from '../SVG';

export default function LockClose({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-label="icon">
			<path
				fill="currentColor"
				d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"
			/>
		</SVG>
	);
}
