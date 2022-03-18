import { PieChart as PieChartIcon } from '@components/Icon';
import { SectorPieChartContainer, ItemHeader, ItemIconContainer } from './style';

export default function SectorPieChart() {
	return (
		<SectorPieChartContainer>
			<ItemIconContainer bgColor="blue">
				<PieChartIcon width={32} height={32} />
			</ItemIconContainer>
			<ItemHeader>섹터 구성</ItemHeader>
		</SectorPieChartContainer>
	);
}
