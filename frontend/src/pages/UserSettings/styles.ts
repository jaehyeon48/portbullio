import styled from 'styled-components';
import { buttonMixin, flexCenter } from '@styles/index';
import { globalColors } from '@constants/index';

export const Container = styled.div`
	${flexCenter};
	flex-direction: column;
	padding: 1em;

	& > input[type='file'] {
		display: none;
	}
`;

export const ImageContainer = styled.div`
	${flexCenter};
	cursor: pointer;
	position: relative;
	width: 100px;
	height: 100px;
	border: 1px solid ${({ theme }) => theme.base.colors.darkGray};
	background-color: ${({ theme }) => theme.card.bgColor};
	border-radius: 50%;

	& > svg {
		fill: ${({ theme }) => theme.userIcon.bgColor};
	}
`;

export const Image = styled.img`
	border-radius: 50%;
`;

export const AddImageIconContainer = styled.div`
	${flexCenter};
	position: absolute;
	z-index: 1;
	width: 36px;
	height: 36px;
	background-color: ${({ theme }) => theme.card.bgColor};
	border: 1px solid ${({ theme }) => theme.base.colors.darkGray};
	border-radius: 50%;
	right: -12px;
	bottom: 6px;

	& > svg {
		fill: ${({ theme }) => theme.userIcon.bgColor};
	}
`;

export const Form = styled.form`
	margin: 40px 10px 10px;

	& div {
		width: 100%;
	}

	& input {
		width: 100%;
		margin-top: 3px;
	}
`;

export const Button = styled.button`
	${buttonMixin};
	font-size: 18px;
	margin: 0.8em 0 0 auto;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	background-color: ${globalColors.primary};
	color: #fff;
`;
