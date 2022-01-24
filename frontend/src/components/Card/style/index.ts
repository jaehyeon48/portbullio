import styled from 'styled-components';

interface CardStyleProps {
	_width?: string | number;
	_height?: string | number;
}

export default styled.div<CardStyleProps>`
	position: relative;
	background-color: ${({ theme }) => theme.card.bgColor};
	color: ${({ theme }) => theme.base.textColor};
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.card.boxShadow};
	width: ${({ _width }) => _width ?? '100%'};
	height: ${({ _height }) => _height ?? '100%'};
`;
