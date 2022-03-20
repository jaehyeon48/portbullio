import { Theme, BarInfo } from '@types';
import { barColors } from '../../colors';
import drawBarTickerText from './drawBarTickerText';
import drawBarRatioText from './drawBarRatioText';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	canvasHeight: number;
	barData: BarInfo[];
}

export default function drawBars({ ctx, theme, canvasHeight, barData }: Props) {
	barData.forEach(({ x, y, width, height, ticker, ratio }, i) => {
		ctx.fillStyle = barColors(theme, i, ticker);
		ctx.fillRect(x, y, width, height);

		drawBarTickerText({ ctx, theme, x: Math.round(x + width / 2), canvasHeight, ticker });
		drawBarRatioText({ ctx, theme, x: Math.round(x + width / 2), y, ratio });
	});
}
