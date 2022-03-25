import { HoldingsRatio } from '@types';
import { ListItems } from '@components/index';
import { formatNum, formatCurrency } from '@utils';
import * as Style from './styles';

interface Props {
	chartData: HoldingsRatio[];
	maxRatio: number;
	numOfBars: number;
}

export default function ProportionChartDetails({ chartData, maxRatio, numOfBars }: Props) {
	return (
		<Style.Container>
			<Style.Header>종목 구성 상세 내용</Style.Header>
			<Style.DetailsListHeaders>
				<Style.DetailsListTickerHeader>종목 티커</Style.DetailsListTickerHeader>
				<Style.DetailsListValueHeader>평가 금액</Style.DetailsListValueHeader>
				<Style.DetailsListRatioHeader>비중</Style.DetailsListRatioHeader>
			</Style.DetailsListHeaders>
			<ListItems
				isListEmpty={chartData.length === 0}
				emptyListNoticeMessage="보유 종목이 없습니다."
				maxHeight="60vh"
			>
				{chartData.map(({ ticker, value, ratio }, idx) => (
					<Style.DetailsItem key={ticker}>
						<Style.Ticker>
							<p>{ticker}</p>
							{chartData.length !== numOfBars && idx >= numOfBars - 1 && (
								<Style.OthersCategoryNotice>기타</Style.OthersCategoryNotice>
							)}
						</Style.Ticker>
						<Style.Value>{formatCurrency(value, 'usd')}</Style.Value>
						<Style.Ratio>
							<Style.RatioColorBar width={(ratio / maxRatio) * 100} />
							<Style.RatioText>{formatNum(ratio.toFixed(3))}%</Style.RatioText>
						</Style.Ratio>
					</Style.DetailsItem>
				))}
			</ListItems>
		</Style.Container>
	);
}
