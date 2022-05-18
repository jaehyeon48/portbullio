import { HoldingsRatio } from '@types';
import { ListContainer, ListItems, Document as DocumentIcon } from '@components/index';
import { formatNum, formatCurrency } from '@utils';
import * as Style from '../styles';

interface Props {
	chartData: HoldingsRatio[];
	maxRatio: number;
	numOfBars: number;
}

export default function ProportionChartDetails({ chartData, maxRatio, numOfBars }: Props) {
	const adjustedMaxRatio = maxRatio === 0 ? 1 : maxRatio;

	return (
		<Style.DetailsContainer>
			<Style.ItemIconContainer bgColor="blue">
				<DocumentIcon width={26} height={26} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>종목 구성 상세 내용</Style.ItemHeader>
			<ListContainer>
				<Style.DetailsListHeaders>
					<Style.DetailListIndexItem>종목 티커</Style.DetailListIndexItem>
					<Style.DetailListDataItem>평가 금액</Style.DetailListDataItem>
					<Style.DetailListRatioItem>비중</Style.DetailListRatioItem>
				</Style.DetailsListHeaders>
				<Style.DetailsListContainer>
					<ListItems
						isListEmpty={chartData.length === 0}
						emptyListNoticeMessage="보유 종목이 없습니다."
						maxHeight="100%"
					>
						{chartData.map(({ ticker, value, ratio }, idx) => (
							<Style.DetailsListItem key={ticker}>
								<Style.DetailListIndexItem>
									<p>{ticker}</p>
									{chartData.length !== numOfBars && idx >= numOfBars - 1 && (
										<Style.OthersCategoryNotice>기타</Style.OthersCategoryNotice>
									)}
								</Style.DetailListIndexItem>
								<Style.DetailListDataItem>{formatCurrency(value, 'usd')}</Style.DetailListDataItem>
								<Style.DetailListRatioItem>
									<Style.DetailListRatioColorBar width={(ratio / adjustedMaxRatio) * 100} />
									<Style.DetailListRatioText>{formatNum(ratio)}%</Style.DetailListRatioText>
								</Style.DetailListRatioItem>
							</Style.DetailsListItem>
						))}
					</ListItems>
				</Style.DetailsListContainer>
			</ListContainer>
		</Style.DetailsContainer>
	);
}
