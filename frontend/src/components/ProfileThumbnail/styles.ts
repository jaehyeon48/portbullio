import styled from 'styled-components';

export const Container = styled.div`
	background-color: ${({ theme }) => theme.card.bgColor};
	width: 50px;
	height: 50px;
	border: 1px solid ${({ theme }) => theme.base.colors.darkGray};
	border-radius: 50%;
`;
