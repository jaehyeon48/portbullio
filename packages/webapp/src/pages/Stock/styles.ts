import { css } from 'styled-components';
import { breakPoints } from '@constants/index';

export const baseFontSize = {
	desktop: 16,
	laptop: 14
};
export const stockPageBaseFontStyle = css`
	font-size: ${baseFontSize.desktop}px;

	@media screen and (max-width: ${breakPoints.laptop}) {
		font-size: ${baseFontSize.laptop}px;
	}
`;
