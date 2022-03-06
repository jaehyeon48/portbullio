import { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export const baseFontSize = {
	desktop: 16,
	laptop: 14
};
export const stockPageBaseFontStyle = css`
	font-size: ${baseFontSize.desktop}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		font-size: ${baseFontSize.laptop}px;
	}
`;
