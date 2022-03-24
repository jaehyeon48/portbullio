import { useTitle } from '@hooks/index';
import { DashboardContainer } from './style';
import ProfitLossAsset from './ProfitLossAsset';
import ProportionByValue from './ProportionChart/ProportionByValue';
import SectorPieChart from './PieChart/SectorPieChart';
import DividendPieChart from './DividendPieChart';
import AssetHistory from './AssetHistory';

export default function Dashboard() {
	useTitle(`portbullio - 대시보드`);
	return (
		<DashboardContainer>
			<ProfitLossAsset />
			<ProportionByValue />
			<SectorPieChart />
			<DividendPieChart />
			<AssetHistory />
		</DashboardContainer>
	);
}
