import { BarChartAsc as BarChartAscIcon } from '@components/Icon';
import * as Style from './style';

export default function ProportionByValue() {
	return (
		<Style.ProportionByValueContainer>
			<Style.ItemIconContainer bgColor="blue">
				<BarChartAscIcon width={20} height={20} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>종목 구성</Style.ItemHeader>
		</Style.ProportionByValueContainer>
	);
}
