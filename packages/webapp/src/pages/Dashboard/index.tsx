import SelectPortfolio from '@components/SelectPortfolio';
import { useSelectedPortfolioId } from '@components/SelectPortfolio/useSelectedPortfolioId';
import useTitle from '@hooks/Title';
import useCashTransactionList from '@hooks/ReactQuery/useCashTransactionList';
import useHoldingsList from '@hooks/ReactQuery/useHoldingsList';
import { useRealtimeData } from '@hooks/realtimeData';
import AssetHistory from './AssetHistory';
import ProfitLossAsset from './ProfitLossAsset';
import ProportionByValue from './ProportionByValue';
import SectorPieChart from './SectorPieChart';
import { DashboardContainer, PortfolioSelectContainer } from './styles';

export default function Dashboard() {
	const portfolioId = useSelectedPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const realtimeData = useRealtimeData();
	const cashTransactions = useCashTransactionList(portfolioId);

	useTitle(`Portbullio - 대시보드`);
	return (
		<DashboardContainer>
			<PortfolioSelectContainer>
				<span>현재 포트폴리오: </span>
				<SelectPortfolio />
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
				isLoadingData={holdingsList.isLoading}
			/>
			<SectorPieChart holdingsList={holdingsList.data ?? []} />
			<AssetHistory portfolioId={portfolioId} />
		</DashboardContainer>
	);
}
