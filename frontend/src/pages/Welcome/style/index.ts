import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flexMixin, buttonMixin } from '@styles/mixins';

export const StyledHeader = styled.header`
	font-size: 2em;
	font-weight: 700;
	margin-top: 3em;
	text-align: center;
	color: ${({ theme }) => theme.globalColors.primary};
`;

export const StyledParagraph = styled.p`
	margin: 2em;
	text-align: center;
`;

export const WelcomeImageContainer = styled.div`
	${flexMixin};
`;

export const StyledLink = styled(Link)`
	${buttonMixin};
	text-decoration: none;
	margin: 2.5em auto;
	padding: 0.3em 0.4em;
`;
