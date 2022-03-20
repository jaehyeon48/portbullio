import crispPixel from '../../utils/crispPixel';
import { CANVAS_TOP_MARGIN, CANVAS_BOT_MARGIN, X_AXIS_MARGIN } from '../constants';

export default function yPos(value: number, maxValue: number, canvasHeight: number) {
	return crispPixel(
		CANVAS_TOP_MARGIN -
			X_AXIS_MARGIN +
			(canvasHeight - CANVAS_BOT_MARGIN) -
			(value / maxValue) * (canvasHeight - CANVAS_BOT_MARGIN)
	);
}
