import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.card.bgColor};
	width: 50px;
	height: 50px;
	box-shadow: 0 0 0 1px ${({ theme }) => theme.base.colors.darkGray};
	border-radius: 50%;

	& > svg {
		fill: ${({ theme }) => theme.userIcon.bgColor};
	}
`;

export default Container;
