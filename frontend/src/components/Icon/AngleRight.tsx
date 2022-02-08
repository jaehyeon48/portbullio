import SVG from '@components/SVG';
import { IconProps } from '@types';

export default function CaretUp({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 128 128" fill={fill} aria-label="icon">
			<path d="M52.6882 91.9627C51.6335 91.9624 50.6026 91.6495 49.7257 91.0635C48.8489 90.4774 48.1654 89.6446 47.7619 88.6702C47.3583 87.6958 47.2527 86.6236 47.4584 85.5892C47.6641 84.5548 48.1718 83.6046 48.9175 82.8587L67.7708 64L48.9175 45.1413C47.946 44.1355 47.4084 42.7882 47.4206 41.3899C47.4327 39.9915 47.9936 38.6538 48.9825 37.665C49.9713 36.6761 51.309 36.1152 52.7073 36.1031C54.1057 36.0909 55.4529 36.6285 56.4588 37.6L79.0828 60.2293C80.0827 61.2295 80.6443 62.5858 80.6443 64C80.6443 65.4142 80.0827 66.7705 79.0828 67.7707L56.4588 90.4C55.9642 90.896 55.3765 91.2894 54.7294 91.5575C54.0823 91.8257 53.3886 91.9634 52.6882 91.9627V91.9627Z" />
		</SVG>
	);
}