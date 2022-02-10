import { css, DefaultTheme } from 'styled-components';

interface PriceColorProps {
	value: number;
}

function calculatePriceColor(theme: DefaultTheme, value: number) {
	if (value > 0) return theme.base.colors.green;
	if (value < 0) return theme.base.colors.red;
	return theme.base.colors.gray;
}

const priceColorMixin = css<PriceColorProps>`
	color: ${({ theme, value }) => calculatePriceColor(theme, value)};

	& svg {
		fill: ${({ theme, value }) => calculatePriceColor(theme, value)};
	}
`;

export default priceColorMixin;
