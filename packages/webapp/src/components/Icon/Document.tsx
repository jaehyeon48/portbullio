import { SVG } from '@components/index';
import { IconProps } from '@types';

export default function Document({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill} aria-label="icon">
			<path d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z" />
			<path d="M10 22h12v2H10zm0-6h12v2H10z" />
		</SVG>
	);
}
