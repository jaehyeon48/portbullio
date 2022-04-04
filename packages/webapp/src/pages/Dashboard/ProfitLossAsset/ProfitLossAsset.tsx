import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { formatNum, formatCurrency, calcTotalCashAmount } from '@utils';
import {
	DynamicCaret,
	LineChartAsc as LineChartAscIcon,
	BarChartArrowAsc as BarChartArrowAscIcon,
	MoneySack as MoneySackIcon
} from '@components/index';
import { calcTotalAssets } from './utils';
import * as Style from '../styles';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
}

export default function ProfitLossAsset({ holdingsList, realtimeData, cashTransactions }: Props) {
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const totalAssets = calcTotalAssets(holdingsList, realtimeData) + totalCashAmount;

	return (
		<Style.ProfitLossAssetContainer>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<LineChartAscIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>오늘 손익</Style.ItemHeader>
				<Style.ProfitLossAssetAmount value={-1}>
					{formatCurrency(1234.56, 'usd')}
					<Style.AmountChange>
						<DynamicCaret value={-1} width={18} height={18} marginTop={2} />
						1.23
					</Style.AmountChange>
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={-1}>{formatNum(-1.23)}%</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<BarChartArrowAscIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>총 손익</Style.ItemHeader>
				<Style.ProfitLossAssetAmount value={1}>
					{formatCurrency(1234567.89, 'usd')}
					<Style.AmountChange>
						<DynamicCaret value={1} width={18} height={18} marginTop={2} />
						1234.56
					</Style.AmountChange>
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={1}>{formatNum(1234.56)}%</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<MoneySackIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>총 자산</Style.ItemHeader>
				<Style.ProfitLossAssetAmount>
					{formatCurrency(totalAssets, 'usd')}
				</Style.ProfitLossAssetAmount>
			</Style.ProfitLossAssetItem>
		</Style.ProfitLossAssetContainer>
	);
}
