import { HoldingsRatio } from '@types';
import yPos from './yPos';
import {
	AXIS_THICKNESS,
	NUM_OF_BARS,
	Y_AXIS_MARGIN,
	DEFAULT_GAP_BTW_BARS,
	MAX_BAR_WIDTH
} from '../constants';

interface Props {
	barData: HoldingsRatio[];
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function calcBarInfo({ barData, maxValue, canvasWidth, canvasHeight }: Props) {
	let gapBtwBars = DEFAULT_GAP_BTW_BARS;
	let barWidth = Math.round(
		(canvasWidth - Y_AXIS_MARGIN - (NUM_OF_BARS + 1) * gapBtwBars) / NUM_OF_BARS
	);

	if (barWidth > MAX_BAR_WIDTH) {
		barWidth = MAX_BAR_WIDTH;
		gapBtwBars = (canvasWidth - Y_AXIS_MARGIN - barWidth * NUM_OF_BARS) / (NUM_OF_BARS + 1);
	}

	const barBottomYPos = yPos(0, maxValue, canvasHeight - AXIS_THICKNESS);
	return barData.map(({ ticker, ratio, value }, i) => {
		const barYPos = yPos(ratio, maxValue, canvasHeight);
		return {
			x: Y_AXIS_MARGIN + gapBtwBars * (i + 1) + barWidth * i,
			y: barYPos,
			width: barWidth,
			height: barBottomYPos - barYPos,
			ticker,
			ratio,
			value
		};
	});
}
