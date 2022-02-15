import { useParams } from 'react-router-dom';
import { TradingViewWidget } from '@components/index';
import { useThemeMode } from '@hooks/index';
import * as Dimensions from '@constants/breakPoints';
import { navbarWidth } from '@constants/index';
import * as StockPageConst from '../constants';
import * as Style from './styles';

function determineWidgetDimension(width: number) {
	const {
		maxWidth,
		rightPanelWidth,
		gapBetweenChartAndRightPanel,
		leftAndRightMargins,
		chartHeight
	} = StockPageConst;

	if (width >= maxWidth) {
		return [
			maxWidth - rightPanelWidth.desktop - gapBetweenChartAndRightPanel.maxWidth,
			chartHeight.desktop
		];
	}

	if (width > Dimensions.LAPTOP_WIDTH) {
		return [
			width -
				navbarWidth -
				rightPanelWidth.desktop -
				gapBetweenChartAndRightPanel.desktop -
				leftAndRightMargins.desktop * 2,
			chartHeight.desktop
		];
	}
	if (width > Dimensions.TABLET_LANDSCAPE_WIDTH) {
		return [
			width -
				navbarWidth -
				rightPanelWidth.laptop -
				gapBetweenChartAndRightPanel.laptop -
				leftAndRightMargins.laptop * 2,
			chartHeight.laptop
		];
	}
	return [500, 500];
}

export default function StockOverview() {
	const [currentTheme] = useThemeMode();
	const { ticker } = useParams() as { ticker: string };
	const displayWidth = window.innerWidth;
	const [widgetWidth, widgetHeight] = determineWidgetDimension(displayWidth);

	return (
		<Style.ChartContainer>
			<TradingViewWidget
				width={widgetWidth}
				height={widgetHeight}
				symbol={ticker}
				theme={currentTheme}
			/>
			<Style.RightPanelContainer>
				<Style.UpperPanel>
					<Style.PanelItem>
						<Style.PanelItemTitle>시가</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>종가</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>저가</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>전일 종가</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
				</Style.UpperPanel>
				<Style.LowerPanel>
					<Style.PanelItem>
						<Style.PanelItemTitle>52주 최고</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>52주 최저</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>시가 총액</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>거래량</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>평균 거래량&#40;3M&#41;</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>P/E &#40;TTM&#41;</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
					<Style.PanelItem>
						<Style.PanelItemTitle>EPS</Style.PanelItemTitle>
						<Style.PanelItemValue>123.12</Style.PanelItemValue>
					</Style.PanelItem>
				</Style.LowerPanel>
			</Style.RightPanelContainer>
		</Style.ChartContainer>
	);
}
