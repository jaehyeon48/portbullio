import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import DynamicCaret from '@components/DynamicCaret';
import { Holding } from '@types';
import { formatNum, formatCurrency } from '@utils';
import * as Style from './styles';

interface Props {
	holdingsList: Holding[] | undefined;
	isLoading: boolean;
}

export default function HoldingsList({ holdingsList, isLoading }: Props) {
	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<ListItems
			isListEmpty={!holdingsList || holdingsList.length === 0}
			emptyListNoticeMessage="보유종목이 없습니다."
		>
			{(holdingsList ?? []).map(({ ticker, avgCost, quantity }, idx) => (
				<ListItem key={ticker} isFirstList={idx === 0}>
					<Style.HoldingTickerSection>{ticker}</Style.HoldingTickerSection>
					<Style.HoldingCurrentPriceSection value={1}>
						<DynamicCaret width={20} height={20} value={1} marginTop={2} />
						{formatCurrency(123.45, 'usd')}&#40;+12.34%&#41;
					</Style.HoldingCurrentPriceSection>
					<Style.HoldingAvgPriceSection>
						{formatCurrency(avgCost, 'usd')}
					</Style.HoldingAvgPriceSection>
					<Style.HoldingQuantitySection>{formatNum(quantity)}</Style.HoldingQuantitySection>
					<Style.HoldingTotalValueSection>
						{formatCurrency(123456789, 'usd')}
					</Style.HoldingTotalValueSection>
					<Style.HoldingDailyGainSection value={-1}>
						<DynamicCaret width={20} height={20} value={-1} marginTop={2} />
						{formatCurrency(123.45, 'usd')}&#40;-12.34%&#41;
					</Style.HoldingDailyGainSection>
					<Style.HoldingTotalGainSection value={1}>
						<DynamicCaret width={20} height={20} value={1} marginTop={2} />
						{formatCurrency(123456, 'usd')}&#40;+12.34%&#41;
					</Style.HoldingTotalGainSection>
				</ListItem>
			))}
		</ListItems>
	);
}
