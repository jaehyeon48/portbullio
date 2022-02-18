import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--cardBgColor);
	width: 50px;
	height: 50px;
	box-shadow: 0 0 0 1px var(--baseBorderColor);
	border-radius: 50%;

	& > svg {
		fill: var(--gray);
	}
`;

export default Container;
