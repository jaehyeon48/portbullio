import { useParams } from 'react-router-dom';
import { TradingViewWidget } from '@components/index';
import { useThemeMode } from '@hooks/index';
import { NAVBAR_WIDTH, WIDTH_BREAK_POINT_PX } from '@constants/index';
import * as Style from './styles';
import RightPanel from './RightPanel';
import {
	PAGE_MAX_WIDTH,
	RIGHT_PANEL_WIDTH,
	CHART_HEIGHT,
	GAP_BTW_CHART_AND_RIGHT_PANEL,
	LEFT_AND_RIGHT_MARGIN
} from '../constants';

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

function determineWidgetDimension(width: number) {
	if (width >= PAGE_MAX_WIDTH) {
		return [
			PAGE_MAX_WIDTH - RIGHT_PANEL_WIDTH.desktop - GAP_BTW_CHART_AND_RIGHT_PANEL.maxWidth,
			CHART_HEIGHT.desktop
		];
	}

	if (width > WIDTH_BREAK_POINT_PX.laptop) {
		return [
			width -
				NAVBAR_WIDTH -
				RIGHT_PANEL_WIDTH.desktop -
				GAP_BTW_CHART_AND_RIGHT_PANEL.desktop -
				LEFT_AND_RIGHT_MARGIN.desktop * 2,
			CHART_HEIGHT.desktop
		];
	}

	if (width > WIDTH_BREAK_POINT_PX.tabletLandScape) {
		return [
			width -
				NAVBAR_WIDTH -
				RIGHT_PANEL_WIDTH.laptop -
				GAP_BTW_CHART_AND_RIGHT_PANEL.laptop -
				LEFT_AND_RIGHT_MARGIN.laptop * 2,
			CHART_HEIGHT.laptop
		];
	}

	if (width > WIDTH_BREAK_POINT_PX.tablet) {
		return [
			width -
				NAVBAR_WIDTH -
				RIGHT_PANEL_WIDTH.tabletLandScape -
				GAP_BTW_CHART_AND_RIGHT_PANEL.tabletLandScape -
				LEFT_AND_RIGHT_MARGIN.tabletLandScape * 2,
			CHART_HEIGHT.tabletLandScape
		];
	}
	return [500, 500];
}
