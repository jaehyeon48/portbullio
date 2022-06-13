import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import DynamicCaret from '@components/DynamicCaret';
import {
	LineChartAsc as LineChartAscIcon,
	BarChartArrowAsc as BarChartArrowAscIcon,
	MoneySack as MoneySackIcon
} from '@components/Icons';
import { formatNum, formatCurrency, calcTotalCashAmount } from '@utils';
import * as Style from './style';
import calcDailyProfitLoss from './utils/calcDailyProfitLoss';
import calcTotalAssets from './utils/calcTotalAssets';
import calcTotalCost from './utils/calcTotalCost';
import calcTotalProfitLoss from './utils/calcTotalProfitLoss';
import { ItemHeader, ItemIconContainer } from '../styles';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
}

export default function ProfitLossAsset({ holdingsList, realtimeData, cashTransactions }: Props) {
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const totalAssets = calcTotalAssets(holdingsList, realtimeData) + totalCashAmount;
	const totalCost = calcTotalCost(holdingsList) + totalCashAmount;
	const dailyProfitLoss = calcDailyProfitLoss(holdingsList, realtimeData);
	const totalProfitLoss = calcTotalProfitLoss(holdingsList, realtimeData);

	return (
		<Style.ProfitLossAssetContainer>
			<Style.ProfitLossAssetItem>
				<ItemIconContainer bgColor="gray">
					<LineChartAscIcon width={24} height={24} />
				</ItemIconContainer>
				<ItemHeader>오늘 손익</ItemHeader>
				<Style.ProfitLossAssetAmount value={dailyProfitLoss}>
					{formatCurrency(dailyProfitLoss, 'usd')}
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={dailyProfitLoss}>
					<DynamicCaret value={dailyProfitLoss} />
					{totalCost === 0
						? 0
						: formatNum((dailyProfitLoss / totalCost) * 100, { signDisplay: 'never' })}
					%
				</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<ItemIconContainer bgColor="gray">
					<BarChartArrowAscIcon width={24} height={24} />
				</ItemIconContainer>
				<ItemHeader>총 손익</ItemHeader>
				<Style.ProfitLossAssetAmount value={totalProfitLoss}>
					{formatCurrency(totalProfitLoss, 'usd')}
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={totalProfitLoss}>
					<DynamicCaret value={totalProfitLoss} />
					{totalCost === 0
						? 0
						: formatNum((totalProfitLoss / totalCost) * 100, { signDisplay: 'never' })}
					%
				</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<ItemIconContainer bgColor="gray">
					<MoneySackIcon width={24} height={24} />
				</ItemIconContainer>
				<ItemHeader>총 자산</ItemHeader>
				<Style.ProfitLossAssetAmount>
					{formatCurrency(totalAssets, 'usd')}
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent>&nbsp;</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
		</Style.ProfitLossAssetContainer>
	);
}
