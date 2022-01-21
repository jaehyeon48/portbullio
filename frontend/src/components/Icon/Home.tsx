import SVG from '@components/Svg';
import { IconProps } from '@types';

export default function Home({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill}>
			<path d="M31.5852 16.5184L17.1869 0.506767C16.5805 -0.168922 15.4159 -0.168922 14.8095 0.506767L0.411128 16.5184C0.203881 16.7483 0.0678459 17.0335 0.0195627 17.3394C-0.0287206 17.6452 0.0128286 17.9586 0.139158 18.2412C0.39513 18.8192 0.967866 19.1907 1.5998 19.1907H4.79944V30.3988C4.79944 30.8235 4.96799 31.2308 5.26801 31.531C5.56804 31.8313 5.97496 32 6.39926 32H11.1987C11.623 32 12.0299 31.8313 12.33 31.531C12.63 31.2308 12.7985 30.8235 12.7985 30.3988V23.9942H19.1978V30.3988C19.1978 30.8235 19.3664 31.2308 19.6664 31.531C19.9664 31.8313 20.3734 32 20.7976 32H25.5971C26.0214 32 26.4283 31.8313 26.7284 31.531C27.0284 31.2308 27.1969 30.8235 27.1969 30.3988V19.1907H30.3966C30.7064 19.192 31.0099 19.1031 31.2701 18.9348C31.5303 18.7664 31.736 18.5259 31.862 18.2427C31.988 17.9594 32.0289 17.6455 31.9798 17.3393C31.9307 17.0332 31.7936 16.7479 31.5852 16.5184Z" />
		</SVG>
	);
}
