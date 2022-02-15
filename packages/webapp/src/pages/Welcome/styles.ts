import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { globalColors } from '@constants/index';
import { flexMixin, buttonMixin } from '@styles/Mixins';

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
	width: fit-content;
	height: fit-content;
	color: #fff;
	background-color: ${globalColors.primary};
	border-radius: 4px;
	text-decoration: none;
	margin: 2.5em auto;
	padding: 0.3em 0.6em;
`;
