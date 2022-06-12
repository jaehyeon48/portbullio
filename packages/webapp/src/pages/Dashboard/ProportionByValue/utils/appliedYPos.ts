import { CANVAS_TOP_MARGIN, CANVAS_BOT_MARGIN, X_AXIS_MARGIN } from '../constants';
import yPos from '../../utils/yPos';

export const appliedYPos = yPos({
	canvasTopMargin: CANVAS_TOP_MARGIN,
	canvasBotMargin: CANVAS_BOT_MARGIN,
	xAxisMargin: X_AXIS_MARGIN
});

export default appliedYPos;
