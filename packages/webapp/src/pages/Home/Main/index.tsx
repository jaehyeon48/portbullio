import { AngleRight } from '@components/Icons';
import useTitle from '@hooks/Title';
import HeroImage from './HeroImage';
import HomeMainButton from './HomeMainButton';
import IndexInfo from './IndexInfo';
import TopStocks from './TopStocks';
import * as Style from './styles';
import useMajorIndicesData from '../hooks/useMajorIndicesData';
import useTopStocksData from '../hooks/useTopStocksData';

export default function Home() {
	const majorIndicesData = useMajorIndicesData();
	const { topActives, topGainers, topLosers } = useTopStocksData();

	useTitle('Portbullio');

	return (
		<>
			<Style.UpperSection>
				<Style.HeroImageContainer>
					<HeroImage />
				</Style.HeroImageContainer>
				<Style.HeaderContainer flexDirection="column">
					<Style.Header>
						미국 주식 포트폴리오 관리, <br /> Port<Style.HeaderPrimary>bull</Style.HeaderPrimary>
						io로 시작하세요!
					</Style.Header>
					<HomeMainButton authText="내 포트폴리오" unAuthText="시작하기" />
				</Style.HeaderContainer>
			</Style.UpperSection>
			<Style.MidSection>
				<IndexInfo
					indexName="다우 존스"
					indexValue={Number(majorIndicesData?.DJI?.price ?? 0)}
					indexValueChange={Number(majorIndicesData?.DJI?.change ?? 0)}
					indexValueChangePercent={Number(majorIndicesData?.DJI?.changePercent ?? 0)}
				/>
				<IndexInfo
					indexName="S&P 500"
					indexValue={Number(majorIndicesData?.GSPC?.price ?? 0)}
					indexValueChange={Number(majorIndicesData?.GSPC?.change ?? 0)}
					indexValueChangePercent={Number(majorIndicesData?.GSPC?.changePercent ?? 0)}
				/>
				<IndexInfo
					indexName="나스닥 종합"
					indexValue={Number(majorIndicesData?.IXIC?.price ?? 0)}
					indexValueChange={Number(majorIndicesData?.IXIC?.change ?? 0)}
					indexValueChangePercent={Number(majorIndicesData?.IXIC?.changePercent ?? 0)}
				/>
			</Style.MidSection>
			<Style.LowerSection>
				<Style.TopStocksListSection>
					<Style.TopStocksListHeader to="/most-actives">
						<span>거래량 상위</span>
						<AngleRight />
					</Style.TopStocksListHeader>
					<TopStocks stockList={topActives?.slice(0, 5)} />
				</Style.TopStocksListSection>
				<Style.TopStocksListSection>
					<Style.TopStocksListHeader to="/most-gainers">
						<span>상승률 상위</span>
						<AngleRight />
					</Style.TopStocksListHeader>
					<TopStocks stockList={topGainers?.slice(0, 5)} />
				</Style.TopStocksListSection>
				<Style.TopStocksListSection>
					<Style.TopStocksListHeader to="/most-losers">
						<span>하락률 상위</span>
						<AngleRight />
					</Style.TopStocksListHeader>
					<TopStocks stockList={topLosers?.slice(0, 5)} />
				</Style.TopStocksListSection>
			</Style.LowerSection>
		</>
	);
}
