import { PortfolioSelect, useSelectedPortfolioId } from '@components/index';
import { useTitle, useHoldingsList, useRealtimeData, useCashTransactionList } from '@hooks/index';
import { DashboardContainer, PortfolioSelectContainer } from './styles';
import ProfitLossAsset from './ProfitLossAsset/ProfitLossAsset';
import ProportionByValue from './ProportionChart/Main/ProportionByValue';
import SectorPieChart from './PieChart/Main/SectorPieChart';
import DividendPieChart from './DividendPieChart';
import AssetHistory from './AssetHistory';

export default function Dashboard() {
	const portfolioId = useSelectedPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const realtimeData = useRealtimeData();
	const cashTransactions = useCashTransactionList(portfolioId);

	useTitle(`portbullio - 대시보드`);
	return (
		<DashboardContainer>
			<PortfolioSelectContainer>
				<span>현재 포트폴리오: </span>
				<PortfolioSelect />
			</PortfolioSelectContainer>
			<ProfitLossAsset
				holdingsList={holdingsList.data ?? []}
				realtimeData={realtimeData}
				cashTransactions={cashTransactions.data ?? []}
			/>
			<ProportionByValue
				holdingsList={holdingsList.data ?? []}
				realtimeData={realtimeData}
				cashTransactions={cashTransactions.data ?? []}
			/>
			<SectorPieChart holdingsList={holdingsList.data ?? []} />
			<DividendPieChart />
			<AssetHistory />
		</DashboardContainer>
	);
}
