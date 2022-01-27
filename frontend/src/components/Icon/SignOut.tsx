import SVG from '@components/SVG';
import { IconProps } from '@types';

export default function SignOut({ width = 40, height = 40, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 40 40" fill={fill} aria-label="icon">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M27.55 9.425V13.325L30.05 10.85V6.25L28.8 5H6.3L5.05 6.25V7.465L5 7.5V33.225L5.9 34.375L18.4 38.675L20 37.5V35H28.8L30.05 33.75V29.225L27.55 26.725V32.5H20V11.775L19.175 10.625L10.09 7.5H27.55V9.425ZM17.5 35.7L7.5 32.35V9.3L17.5 12.65V35.7V35.7ZM33.8 21.2H21.375V18.7H33.7L29.7 14.7L31.475 12.95L37.65 19.1V20.875L31.425 27.075L29.675 25.325L33.8 21.2V21.2Z"
			/>
		</SVG>
	);
}
