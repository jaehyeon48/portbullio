import { CurveLineChart as CurveLineChartIcon } from '@components/Icon';
import { AssetHistoryContainer, ItemHeader, ItemIconContainer } from './style';

export default function AssetHistory() {
	return (
		<AssetHistoryContainer>
			<ItemIconContainer bgColor="blue">
				<CurveLineChartIcon width={32} height={32} />
			</ItemIconContainer>
			<ItemHeader>자산 추이</ItemHeader>
		</AssetHistoryContainer>
	);
}
