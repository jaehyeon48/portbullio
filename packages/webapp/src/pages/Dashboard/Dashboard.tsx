import { DashboardContainer, SectorDividendPieChartContainer } from './style';
import ProfitLossAsset from './ProfitLossAsset';
import ProportionByValue from './ProportionByValue';
import SectorPieChart from './SectorPieChart';
import DividendPieChart from './DividendPieChart';
import AssetHistory from './AssetHistory';

export default function Dashboard() {
	return (
		<DashboardContainer>
			<ProfitLossAsset />
			<ProportionByValue />
			<SectorDividendPieChartContainer>
				<SectorPieChart />
				<DividendPieChart />
			</SectorDividendPieChartContainer>
			<AssetHistory />
		</DashboardContainer>
	);
}
