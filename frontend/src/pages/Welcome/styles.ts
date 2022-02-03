import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flexMixin, buttonMixin, globalColors } from '@styles/mixins';

export const Header = styled.header`
	font-size: 2em;
	font-weight: 700;
	margin-top: 3em;
	text-align: center;
	color: ${globalColors.primary};
`;

export const Paragraph = styled.p`
	margin: 2em;
	text-align: center;
`;

export const ImageContainer = styled.div`
	${flexMixin};
`;

export const Anchor = styled(Link)`
	${buttonMixin};
	text-decoration: none;
	margin: 2.5em auto;
	padding: 0.3em 0.4em;
`;
