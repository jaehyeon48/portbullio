import styled from 'styled-components';
import { getColor } from '@utils';

interface SvgStyleProps {
	width: string | number;
	height: string | number;
	fill: string;
}

const SVG = styled.svg<SvgStyleProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	fill: ${({ fill, theme }) => getColor(theme, fill) ?? fill};
`;

export default SVG;
