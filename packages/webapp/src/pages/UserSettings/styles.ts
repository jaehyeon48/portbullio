import styled, { css } from 'styled-components';
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
	font-size: 14px;
	margin: 0.8em 0 0 auto;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	background-color: ${globalColors.primary};
	color: #fff;
`;

export const UploadButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 20px;
	padding-right: 10px;

	& > div {
		display: flex;
	}
`;

const ImageButtonStyle = css`
	${buttonMixin};
	font-size: 14px;
	margin-left: 12px;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	color: #fff;
`;

export const ImageUploadCancelButton = styled.button`
	${ImageButtonStyle};
	background-color: ${({ theme }) => theme.base.colors.darkGray};
`;

export const ImageUploadButton = styled.button`
	${ImageButtonStyle};
	background-color: ${globalColors.primary};
`;

export const ImageDeleteButton = styled.button`
	${ImageButtonStyle};
	background-color: ${globalColors.deepRed};

	&:disabled {
		cursor: not-allowed;
		color: ${({ theme }) => theme.base.colors.gray};
		background-color: ${({ theme }) => theme.base.colors.darkGray};
	}
`;

export const NoticeNotSupportedImageType = styled.p`
	color: ${globalColors.deepRed};
	margin: 0.5em 0 0 0;
`;

export const DeleteConfirmContainer = styled.div`
	padding: 14px 0;

	& > div {
		margin-top: 6px;
		display: flex;
		justify-content: center;
	}
`;

export const DeleteConfirmMessage = styled.p`
	text-align: center;
`;

const DeleteConfirmButtonStyle = css`
	${buttonMixin};
	font-size: 14px;
	padding: 0.4em 0.5em;
	margin: 0 8px;
	border-radius: 4px;
	color: #fff;
`;

export const DeleteConfirmCancelButton = styled.button`
	${DeleteConfirmButtonStyle};
	background-color: ${({ theme }) => theme.base.colors.darkGray};
`;

export const DeleteConfirmButton = styled.button`
	${DeleteConfirmButtonStyle};
	background-color: ${globalColors.deepRed};
`;
