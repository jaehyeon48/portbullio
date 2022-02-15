import styled from 'styled-components';

interface CardStyleProps {
	width?: string | number;
	height?: string | number;
}

const Card = styled.div<CardStyleProps>`
	position: relative;
	background-color: ${({ theme }) => theme.card.bgColor};
	color: ${({ theme }) => theme.base.textColor};
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.card.boxShadow};
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '100%'};
`;

export default Card;
