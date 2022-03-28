import { PieChart as PieChartIcon } from '@components/Icon';
import { DividendPieChartContainer, ItemHeader, ItemIconContainer } from './styles';

export default function DividendPieChart() {
	return (
		<DividendPieChartContainer>
			<ItemIconContainer bgColor="blue">
				<PieChartIcon width={32} height={32} />
			</ItemIconContainer>
			<ItemHeader>배당 구성</ItemHeader>
		</DividendPieChartContainer>
	);
}
