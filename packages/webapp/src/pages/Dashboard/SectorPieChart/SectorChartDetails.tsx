import { SectorPieChartRatio } from '@types';
import { ListContainer, ListItems, Document as DocumentIcon } from '@components/index';
import { formatNum } from '@utils';
import * as Style from '../styles';
import { translateSectorToKor } from './utils';

interface Props {
	chartData: SectorPieChartRatio[];
	maxRatio: number;
	numOfPies: number;
}

export default function SectorChartDetails({ chartData, maxRatio, numOfPies }: Props) {
	return (
		<Style.DetailsContainer>
			<Style.ItemIconContainer bgColor="blue">
				<DocumentIcon width={26} height={26} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>섹터 구성 상세 내용</Style.ItemHeader>
			<ListContainer>
				<Style.DetailsListHeaders>
					<Style.DetailListIndexItem>섹터</Style.DetailListIndexItem>
					<Style.DetailListDataItem>구성 종목</Style.DetailListDataItem>
					<Style.DetailListRatioItem>비중</Style.DetailListRatioItem>
				</Style.DetailsListHeaders>
				<Style.DetailsListContainer>
					<ListItems
						isListEmpty={chartData.length === 0}
						emptyListNoticeMessage="보유 종목이 없습니다."
						maxHeight="100%"
					>
						{chartData.map(({ sector, includedStocks, ratio }, idx) => (
							<Style.DetailsListItem key={sector}>
								<Style.DetailListIndexItem>
									<p>{translateSectorToKor(sector)}</p>
									{chartData.length !== numOfPies && idx >= numOfPies - 1 && (
										<Style.OthersCategoryNotice>기타</Style.OthersCategoryNotice>
									)}
								</Style.DetailListIndexItem>
								<Style.DetailListDataItem>{includedStocks.join(', ')}</Style.DetailListDataItem>
								<Style.DetailListRatioItem>
									<Style.DetailListRatioColorBar width={(ratio / maxRatio) * 100} />
									<Style.DetailListRatioText>{formatNum(ratio * 100)}%</Style.DetailListRatioText>
								</Style.DetailListRatioItem>
							</Style.DetailsListItem>
						))}
					</ListItems>
				</Style.DetailsListContainer>
			</ListContainer>
		</Style.DetailsContainer>
	);
}
