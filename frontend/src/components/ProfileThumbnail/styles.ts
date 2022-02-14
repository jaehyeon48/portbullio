import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.card.bgColor};
	width: 50px;
	height: 50px;
	border: 1px solid ${({ theme }) => theme.base.colors.darkGray};
	border-radius: 50%;

	& > svg {
		fill: ${({ theme }) => theme.userIcon.bgColor};
	}
`;

export default Container;
