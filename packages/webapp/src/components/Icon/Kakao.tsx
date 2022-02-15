import { SVG } from '@components/index';
import { IconProps } from '@types';

export default function Kakao({ width = 35, height = 32, fill = '#3E2224' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 35 32" fill={fill} aria-label="icon">
			<path d="M17.235 0.23077C20.3504 0.23077 23.2318 0.836539 25.8793 2.04808C28.5267 3.25962 30.6197 4.90705 32.1581 6.99039C33.6966 9.07372 34.4658 11.3462 34.4658 13.8077C34.4658 16.2692 33.6966 18.5449 32.1581 20.6346C30.6197 22.7244 28.5299 24.375 25.8889 25.5865C23.2479 26.7981 20.3632 27.4038 17.235 27.4038C16.2479 27.4038 15.2286 27.3333 14.1774 27.1923C9.61325 30.359 7.18376 31.9615 6.88889 32C6.74786 32.0513 6.61325 32.0449 6.48504 31.9808C6.43376 31.9423 6.3953 31.891 6.36966 31.8269C6.34402 31.7628 6.3312 31.7051 6.3312 31.6538V31.5769C6.40812 31.0769 6.99145 28.9936 8.0812 25.3269C5.60684 24.0962 3.64209 22.4647 2.18696 20.4327C0.731837 18.4006 0.00427246 16.1923 0.00427246 13.8077C0.00427246 11.3462 0.773503 9.07372 2.31196 6.99039C3.85043 4.90705 5.94338 3.25962 8.59081 2.04808C11.2382 0.836539 14.1197 0.23077 17.235 0.23077Z" />
		</SVG>
	);
}