import { PortfolioSelect } from '@components/index';
import { useTitle } from '@hooks/index';
import { DashboardContainer, PortfolioSelectContainer } from './style';
import ProfitLossAsset from './ProfitLossAsset';
import ProportionByValue from './ProportionChart/Main/ProportionByValue';
import SectorPieChart from './PieChart/Main/SectorPieChart';
import DividendPieChart from './DividendPieChart';
import AssetHistory from './AssetHistory';

export default function Dashboard() {
	useTitle(`portbullio - 대시보드`);
	return (
		<DashboardContainer>
			<PortfolioSelectContainer>
				<span>현재 포트폴리오: </span>
				<PortfolioSelect />
			</PortfolioSelectContainer>
			<ProfitLossAsset />
			<ProportionByValue />
			<SectorPieChart />
			<DividendPieChart />
			<AssetHistory />
		</DashboardContainer>
	);
}
