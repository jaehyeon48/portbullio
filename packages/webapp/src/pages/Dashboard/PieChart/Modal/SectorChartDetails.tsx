import { SectorPieChartRatio } from '@types';
import { ListItems } from '@components/index';
import { formatNum } from '@utils';
import { translateSectorToKor } from '../utils';
import * as Style from './styles';

interface Props {
	chartData: SectorPieChartRatio[];
	maxRatio: number;
	numOfPies: number;
}

export default function SectorChartDetails({ chartData, maxRatio, numOfPies }: Props) {
	return (
		<Style.Container>
			<Style.Header>섹터 구성 상세 내용</Style.Header>
			<Style.DetailsListHeaders>
				<Style.DetailsListSectorHeader>섹터</Style.DetailsListSectorHeader>
				<Style.DetailsListIncludedStocksHeader>구성 종목</Style.DetailsListIncludedStocksHeader>
				<Style.DetailsListRatioHeader>비중</Style.DetailsListRatioHeader>
			</Style.DetailsListHeaders>
			<ListItems
				isListEmpty={chartData.length === 0}
				emptyListNoticeMessage="보유 종목이 없습니다."
				maxHeight="60vh"
			>
				{chartData.map(({ sector, includedStocks, ratio }, idx) => (
					<Style.DetailsItem key={sector}>
						<Style.Sector>
							<p>{translateSectorToKor(sector)}</p>
							{chartData.length !== numOfPies && idx >= numOfPies - 1 && (
								<Style.OthersCategoryNotice>기타</Style.OthersCategoryNotice>
							)}
						</Style.Sector>
						<Style.IncludedStocks>{includedStocks.join(', ')}</Style.IncludedStocks>
						<Style.Ratio>
							<Style.RatioColorBar width={(ratio / maxRatio) * 100} />
							<Style.RatioText>{formatNum((ratio * 100).toFixed(3))}%</Style.RatioText>
						</Style.Ratio>
					</Style.DetailsItem>
				))}
			</ListItems>
		</Style.Container>
	);
}
