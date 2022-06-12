import { IconProps } from '@types';
import SVG from '../SVG';

export default function Filter({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 1024 1024" fill={fill} aria-label="icon">
			<path d="M853.333 128H170.667C159.351 128 148.498 132.495 140.497 140.497C132.495 148.498 128 159.351 128 170.667V281.173C128 303.488 137.088 325.419 152.875 341.205L384 572.331V896C384.008 903.269 385.872 910.416 389.414 916.764C392.957 923.111 398.061 928.45 404.243 932.274C410.425 936.098 417.481 938.28 424.743 938.615C432.004 938.95 439.231 937.426 445.739 934.187L616.405 848.853C630.869 841.6 640 826.837 640 810.667V572.331L871.125 341.205C886.912 325.419 896 303.488 896 281.173V170.667C896 159.351 891.505 148.498 883.503 140.497C875.502 132.495 864.649 128 853.333 128V128ZM567.168 524.501C563.198 528.457 560.05 533.158 557.904 538.335C555.759 543.512 554.659 549.063 554.667 554.667V784.299L469.333 826.965V554.667C469.341 549.063 468.241 543.512 466.096 538.335C463.95 533.158 460.802 528.457 456.832 524.501L213.333 281.173V213.333H810.709L810.795 280.875L567.168 524.501V524.501Z" />
		</SVG>
	);
}