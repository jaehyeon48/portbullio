import styled from 'styled-components';
import { flexMixin } from '@styles/mixins';

export const PageContainer = styled.div`
	width: 428px;
	height: 480px;
`;

export const HeaderContainer = styled.div`
	${flexMixin};
	height: 30%;

	& > header {
		margin-top: 1em;
		font-size: 2.7em;
		font-weight: 700;
		color: ${({ theme }) => theme.globalColors.primary};
	}
`;

export const ButtonContainer = styled.div`
	${flexMixin};
	height: 60%;
	margin-top: 3.7em;

	& > a {
		text-decoration: none;
		align-items: center;
		justify-content: space-evenly;
		border-radius: 3px;
		height: 50px;
		font-size: 1.1em;
		font-weight: 500;
	}
`;

export const ButtonIconContainer = styled.div`
	${flexMixin};
	justify-content: center;
	width: 10%;
`;

export const ButtonTextContainer = styled.div`
	width: 50%;
`;
