import { IconProps } from '@types';
import SVG from '../SVG';

export default function Naver({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill} aria-label="icon">
			<path
				d="M2.13333 0C2.13333 0 0 0 0 2.13333V29.8667C0 29.8667 0 32 2.13333 32H29.8667C29.8667 32 32 32 32 29.8667V2.13333C32 2.13333 32 0 29.8667 0H2.13333ZM6.68667 7.46667H13.06L18.96 16.0773V7.46667H25.3133V24.5333H18.94L13.04 15.924V24.5333H6.68667V7.46667Z"
				fill="white"
			/>
		</SVG>
	);
}
