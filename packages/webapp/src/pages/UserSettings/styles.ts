import styled from 'styled-components';
import { buttonMixin, flexCenter } from '@styles/index';
import { globalColors } from '@constants/index';

interface ImageUploadButtonProps {
	bgPrimary?: string;
}

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
	box-shadow: 0 0 0 1px ${({ theme }) => theme.base.colors.darkGray};
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
	margin: 20px 10px 10px;

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
	font-size: 16px;
	margin: 0.8em 0 0 auto;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	background-color: ${globalColors.primary};
	color: #fff;
`;

export const ImageUploadButton = styled.button<ImageUploadButtonProps>`
	${buttonMixin};
	font-size: 16px;
	margin-left: 12px;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	background-color: ${({ theme, bgPrimary }) =>
		bgPrimary ? globalColors.primary : theme.base.colors.darkGray};
	color: #fff;
`;

export const UploadButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 12px;
	padding-right: 10px;
`;

export const NoticeNotSupportedImageType = styled.p`
	color: ${globalColors.deepRed};
	margin: 0.5em 0 0 0;
`;
