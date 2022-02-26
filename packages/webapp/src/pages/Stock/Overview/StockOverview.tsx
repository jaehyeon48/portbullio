import { useParams } from 'react-router-dom';
import { TradingViewWidget } from '@components/index';
import { useThemeMode } from '@hooks/index';
import * as Dimensions from '@constants/breakPoints';
import { navbarWidth } from '@constants/index';
import * as StockPageConst from '../constants';
import * as Style from './styles';
import RightPanel from './RightPanel';

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
			<RightPanel />
		</Style.ChartContainer>
	);
}
