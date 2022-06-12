import { IconProps } from '@types';
import SVG from '../SVG';

export default function Times({ width = 16, height = 16, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 16 16" fill={fill} aria-label="icon">
			<path d="M9.17563 7.98187L15.8076 1.36761C15.9387 1.21497 16.0072 1.01864 15.9994 0.817837C15.9916 0.617035 15.9082 0.426555 15.7657 0.28446C15.6232 0.142366 15.4322 0.0591225 15.2309 0.0513664C15.0295 0.0436103 14.8327 0.111912 14.6796 0.242623L8.04764 6.85688L1.41563 0.234644C1.26499 0.084404 1.06068 0 0.847635 0C0.634593 0 0.430278 0.084404 0.279635 0.234644C0.128992 0.384884 0.0443614 0.588653 0.0443614 0.801125C0.0443614 1.0136 0.128992 1.21737 0.279635 1.36761L6.91964 7.98187L0.279635 14.5961C0.195889 14.6677 0.127873 14.7557 0.0798545 14.8547C0.0318359 14.9536 0.00485175 15.0615 0.000596153 15.1713C-0.00365944 15.2812 0.0149049 15.3908 0.0551246 15.4932C0.0953442 15.5956 0.156351 15.6886 0.234315 15.7663C0.312278 15.8441 0.405516 15.9049 0.508176 15.945C0.610836 15.9851 0.720702 16.0036 0.830878 15.9994C0.941053 15.9952 1.04916 15.9682 1.14841 15.9204C1.24766 15.8725 1.33592 15.8046 1.40763 15.7211L8.04764 9.10685L14.6796 15.7211C14.8327 15.8518 15.0295 15.9201 15.2309 15.9124C15.4322 15.9046 15.6232 15.8214 15.7657 15.6793C15.9082 15.5372 15.9916 15.3467 15.9994 15.1459C16.0072 14.9451 15.9387 14.7488 15.8076 14.5961L9.17563 7.98187Z" />
		</SVG>
	);
}