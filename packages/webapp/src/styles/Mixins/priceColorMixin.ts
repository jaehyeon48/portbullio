import { css, DefaultTheme } from 'styled-components';

export interface PriceColorProps {
	value: number;
}

function calculatePriceColor(theme: DefaultTheme, value: number) {
	if (value > 0) return 'var(--priceGreen)';
	if (value < 0) return 'var(--priceRed)';
	return theme.base.colors.gray;
}

const priceColorMixin = css<PriceColorProps>`
	color: ${({ theme, value }) => calculatePriceColor(theme, value)};

	& svg {
		fill: ${({ theme, value }) => calculatePriceColor(theme, value)};
	}
`;

export default priceColorMixin;
