import { AngleRight, DynamicCaret } from '@components/index';
import { formatNum } from '@utils';
import HeroImage from './HeroImage';
import * as Style from './styles';
import Top5Stocks from './Top5Stocks';
import HomeMainButton from './HomeMainButton';

export default function Home() {
	return (
		<>
			<Style.Section justifyContent="space-evenly">
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
			</Style.Section>
			<Style.Section margin="5em auto 8em" justifyContent="space-evenly">
				<Style.IndexContainer>
					<Style.IndexHeader>다우 존스</Style.IndexHeader>
					<Style.IndexInfo value={-1}>
						<Style.IndexPriceContainer>
							<Style.IndexPrice>{formatNum(36068.87)}</Style.IndexPrice>
							<Style.IndexPriceChange>
								<DynamicCaret value={-1} width={20} height={20} />
								{formatNum(1234.56)}
							</Style.IndexPriceChange>
						</Style.IndexPriceContainer>
						<Style.IndexChangePercent>-0.45%</Style.IndexChangePercent>
					</Style.IndexInfo>
				</Style.IndexContainer>
				<Style.IndexContainer>
					<Style.IndexHeader>S&amp;P 500</Style.IndexHeader>
					<Style.IndexInfo value={-1}>
						<Style.IndexPriceContainer>
							<Style.IndexPrice>{formatNum(4670.29)}</Style.IndexPrice>
							<Style.IndexPriceChange>
								<DynamicCaret value={-1} width={20} height={20} />
								{formatNum(123.45)}
							</Style.IndexPriceChange>
						</Style.IndexPriceContainer>
						<Style.IndexChangePercent>-0.14%</Style.IndexChangePercent>
					</Style.IndexInfo>
				</Style.IndexContainer>
				<Style.IndexContainer>
					<Style.IndexHeader>나스닥 종합</Style.IndexHeader>
					<Style.IndexInfo value={1}>
						<Style.IndexPriceContainer>
							<Style.IndexPrice>{formatNum(14942.83)}</Style.IndexPrice>
							<Style.IndexPriceChange>
								<DynamicCaret value={1} width={20} height={20} />
								{formatNum(1.23)}
							</Style.IndexPriceChange>
						</Style.IndexPriceContainer>
						<Style.IndexChangePercent>+0.05%</Style.IndexChangePercent>
					</Style.IndexInfo>
				</Style.IndexContainer>
			</Style.Section>
			<Style.Section margin="0 auto 5em" justifyContent="space-evenly">
				<Style.Top5ListSection>
					<Style.Top5ListHeader to="/">
						<span>거래량 TOP5</span>
						<AngleRight />
					</Style.Top5ListHeader>
					<Top5Stocks stockList={volumeTop5} />
					<Style.Top5ListItems />
				</Style.Top5ListSection>
				<Style.Top5ListSection>
					<Style.Top5ListHeader to="/">
						<span>상승률 TOP5</span>
						<AngleRight />
					</Style.Top5ListHeader>
					<Top5Stocks stockList={gainerTop5} />
					<Style.Top5ListItems />
				</Style.Top5ListSection>
				<Style.Top5ListSection>
					<Style.Top5ListHeader to="/">
						<span>하락률 TOP5</span>
						<AngleRight />
					</Style.Top5ListHeader>
					<Top5Stocks stockList={loserTop5} />
					<Style.Top5ListItems />
				</Style.Top5ListSection>
			</Style.Section>
		</>
	);
}

const volumeTop5 = [
	{
		ticker: 'ZNGA',
		change: 40.67,
		price: 8.44
	},
	{
		ticker: 'SQQQ',
		change: -0.45,
		price: 6.71
	},
	{
		ticker: 'F',
		change: -2.41,
		price: 23.85
	},
	{
		ticker: 'SPY',
		change: -0.12,
		price: 465.51
	},
	{
		ticker: 'PETZ',
		change: -81.86,
		price: 0.74
	}
];

const gainerTop5 = [
	{
		ticker: 'BBLG',
		change: 57.14,
		price: 5.39
	},
	{
		ticker: 'ZNGA',
		change: 40.67,
		price: 8.444
	},
	{
		ticker: 'MOLN',
		change: 30.46,
		price: 28.85
	},
	{
		ticker: 'RELI',
		change: 28.85,
		price: 7.86
	},
	{
		ticker: 'RXST',
		change: 28.21,
		price: 11.5
	}
];

const loserTop5 = [
	{
		ticker: 'PIK',
		change: -27.48,
		price: 4.75
	},
	{
		ticker: 'CURV',
		change: -23.36,
		price: 8.2
	},
	{
		ticker: 'RPID',
		change: -21.23,
		price: 7.2
	},
	{
		ticker: 'HGSH',
		change: -20.98,
		price: 2.75
	},
	{
		ticker: 'MRIN',
		change: -18.98,
		price: 3.67
	}
];
