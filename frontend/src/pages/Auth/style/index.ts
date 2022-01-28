import styled from 'styled-components';
import { flexMixin } from '@styles/mixins';

export const AuthPageContainer = styled.div`
	width: 428px;
	height: 480px;
`;

export const AuthPageHeaderContainer = styled.div`
	${flexMixin};
	height: 30%;

	& > header {
		margin-top: 1em;
		font-size: 2.7em;
		font-weight: 700;
		color: ${({ theme }) => theme.globalColors.primary};
	}
`;

export const AuthPageButtonContainer = styled.div`
	${flexMixin};
	height: 60%;
	margin-top: 3.7em;

	& > button {
		align-items: center;
		justify-content: space-evenly;
		border-radius: 3px;
		height: 50px;
		font-size: 1.1em;
		font-weight: 500;
	}
`;

export const AuthPageButtonIconContainer = styled.div`
	${flexMixin};
	justify-content: center;
	width: 10%;
`;

export const AuthPageButtonTextContainer = styled.div`
	width: 50%;
`;
