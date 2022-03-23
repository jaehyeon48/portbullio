import styled from 'styled-components';

interface LegendColorBoxProps {
	backgroundColor: string;
}

export const LegendList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

export const LegendListItem = styled.li`
	display: flex;
	align-items: center;
	gap: 10px;

	& + & {
		margin-top: 12px;
	}
`;

export const LegendColorBox = styled.div<LegendColorBoxProps>`
	width: 30px;
	height: 14px;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const LegendItemText = styled.span``;
