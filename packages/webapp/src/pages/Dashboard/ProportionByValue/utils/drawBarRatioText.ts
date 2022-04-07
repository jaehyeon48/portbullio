import { Theme } from '@types';
import { textColor } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	x: number;
	y: number;
	ratio: number;
}

export default function drawBarRatioText({ ctx, theme, x, y, ratio }: Props) {
	ctx.font = '16px NotoSansKR';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = textColor(theme);
	ctx.fillText(`${ratio.toFixed(3)}%`, x, y);
}