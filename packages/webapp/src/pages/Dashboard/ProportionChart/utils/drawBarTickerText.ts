import { Theme } from '@types';
import { textColor } from '../../colors';
import { TEXT_GAP } from '../constants';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	x: number;
	canvasHeight: number;
	ticker: string;
}

export default function drawBarTickerText({ ctx, theme, x, canvasHeight, ticker }: Props) {
	const textMetrics = ctx.measureText(ticker);
	const tickerTextHeight =
		textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
	const tickerTextY = canvasHeight - tickerTextHeight + TEXT_GAP;

	ctx.font = '16px NotoSansKR';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = textColor(theme);
	ctx.fillText(ticker, x, tickerTextY);
}
