import SVG from '@components/Svg';
import { IconProps } from '@types';

export default function Settings({ width = 30, height = 30, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 30 30" fill={fill} ariaLabel="icon">
			<path d="M17.2838 30H11.8238C11.4817 30.0001 11.1498 29.8832 10.8833 29.6687C10.6167 29.4543 10.4315 29.1552 10.3583 28.821L9.74778 25.995C8.93337 25.6382 8.16113 25.1919 7.44528 24.6645L4.68978 25.542C4.36363 25.646 4.01171 25.6353 3.69246 25.5117C3.37322 25.3881 3.10586 25.159 2.93478 24.8625L0.198782 20.136C0.0294996 19.8392 -0.0340447 19.4937 0.0185451 19.1561C0.0711349 18.8185 0.236745 18.5088 0.488282 18.2775L2.62578 16.3275C2.52858 15.4442 2.52858 14.5528 2.62578 13.6695L0.488282 11.724C0.236389 11.4927 0.0705534 11.1826 0.017955 10.8447C-0.0346433 10.5067 0.0291156 10.161 0.198782 9.864L2.92878 5.1345C3.09986 4.83797 3.36722 4.60889 3.68646 4.48528C4.00571 4.36168 4.35763 4.35099 4.68378 4.455L7.43928 5.3325C7.80528 5.0625 8.18628 4.8105 8.57928 4.5825C8.95878 4.3695 9.34878 4.176 9.74778 4.0035L10.3598 1.1805C10.4326 0.846297 10.6175 0.547032 10.8838 0.332323C11.1501 0.117615 11.4817 0.000359949 11.8238 0H17.2838C17.6258 0.000359949 17.9575 0.117615 18.2238 0.332323C18.49 0.547032 18.6749 0.846297 18.7478 1.1805L19.3658 4.005C19.7858 4.191 20.1968 4.3995 20.5943 4.632C20.9648 4.8465 21.3233 5.082 21.6683 5.3355L24.4253 4.458C24.7512 4.35437 25.1028 4.36526 25.4217 4.48884C25.7407 4.61243 26.0078 4.84129 26.1788 5.1375L28.9088 9.867C29.2568 10.4775 29.1368 11.25 28.6193 11.7255L26.4818 13.6755C26.579 14.5588 26.579 15.4502 26.4818 16.3335L28.6193 18.2835C29.1368 18.7605 29.2568 19.5315 28.9088 20.142L26.1788 24.8715C26.0077 25.168 25.7403 25.3971 25.4211 25.5207C25.1019 25.6443 24.7499 25.655 24.4238 25.551L21.6683 24.6735C20.953 25.2005 20.1812 25.6463 19.3673 26.0025L18.7478 28.821C18.6746 29.1549 18.4896 29.4539 18.2234 29.6683C17.9571 29.8827 17.6256 29.9997 17.2838 30ZM14.5478 9C12.9565 9 11.4304 9.63214 10.3051 10.7574C9.17992 11.8826 8.54778 13.4087 8.54778 15C8.54778 16.5913 9.17992 18.1174 10.3051 19.2426C11.4304 20.3679 12.9565 21 14.5478 21C16.1391 21 17.6652 20.3679 18.7904 19.2426C19.9156 18.1174 20.5478 16.5913 20.5478 15C20.5478 13.4087 19.9156 11.8826 18.7904 10.7574C17.6652 9.63214 16.1391 9 14.5478 9Z" />
		</SVG>
	);
}
