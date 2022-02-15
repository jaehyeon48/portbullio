import styled from 'styled-components';
import { MessageType, Theme, ToastStyles, ToastPosition, ToastPositions } from './types';

const progressBarHeight = '5px';

interface MessageProps {
	currentTheme: Theme;
	messageType: MessageType;
}

interface ProgressBarProps extends MessageProps {
	duration: number;
}

interface ToastContainerProps {
	position: ToastPosition;
}

const ToastTheme: ToastStyles = {
	light: {
		success: {
			backgroundColor: '#4CAF50',
			progressBarColor: '#CCF4CD',
			color: '#FFF1F1'
		},
		warning: {
			backgroundColor: '#FABE0C',
			progressBarColor: '#FFF6C5',
			color: '#FFFCF3'
		},
		error: {
			backgroundColor: '#FF5252',
			progressBarColor: '#FFCBCB',
			color: '#F1FFF1'
		},
		info: {
			backgroundColor: '#2196F3',
			progressBarColor: '#BDE0FB',
			color: '#F3FAFF'
		}
	},
	dark: {
		success: {
			backgroundColor: '#16B542',
			progressBarColor: '#CCF4CD',
			color: '#F1FFF1'
		},
		warning: {
			backgroundColor: '#EBB410',
			progressBarColor: '#FFF6C5',
			color: '#FFFCF3'
		},
		error: {
			backgroundColor: '#E74949',
			progressBarColor: '#FFCBCB',
			color: '#FFF1F1'
		},
		info: {
			backgroundColor: '#1D86E8',
			progressBarColor: '#BDE0FB',
			color: '#F3FAFF'
		}
	}
};

const positions: ToastPositions = {
	topLeft: {
		top: '12px',
		left: '12px'
	},
	topRight: {
		top: '12px',
		right: '12px'
	},
	topCenter: {
		top: '12px',
		left: '50%',
		translateX: '-50%'
	},
	bottomLeft: {
		bottom: '12px',
		left: '12px'
	},
	bottomRight: {
		bottom: '12px',
		right: '12px'
	},
	bottomCenter: {
		bottom: '12px',
		left: '50%',
		translateX: '-50%'
	}
};

export const ToastContainer = styled.div<ToastContainerProps>`
	position: fixed;
	z-index: 9999;
	top: ${({ position }) => positions[position].top};
	bottom: ${({ position }) => positions[position].bottom};
	left: ${({ position }) => positions[position].left};
	right: ${({ position }) => positions[position].right};
	transform: translateX(${({ position }) => positions[position].translateX});
`;

export const Toast = styled.div<ProgressBarProps>`
	position: relative;
	display: flex;
	align-items: center;
	width: fit-content;
	min-height: 30px;
	border-radius: 5px 5px 0px 0px;
	margin-bottom: 1em;
	padding: 0.7em 0.7em calc(0.7em + ${progressBarHeight});
	background-color: ${({ currentTheme, messageType }) =>
		ToastTheme[currentTheme][messageType].backgroundColor};
	animation: flipIn ${({ duration }) => Math.min(400, duration / 1.5)}ms;

	& > svg {
		fill: ${({ currentTheme, messageType }) => ToastTheme[currentTheme][messageType].color};
		margin-right: 0.5em;
	}

	@keyframes flipIn {
		from {
			transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			animation-timing-function: ease-in;
			opacity: 0;
		}
		40% {
			transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			animation-timing-function: ease-in;
		}
		60% {
			transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			opacity: 1;
		}
		80% {
			transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
		}
		to {
			transform: perspective(400px);
		}
	}
`;

export const Message = styled.p<MessageProps>`
	width: 300px;
	max-height: 60px;
	margin: 0;
	word-break: break-all;
	color: ${({ currentTheme, messageType }) => ToastTheme[currentTheme][messageType].color};
	overflow: hidden;
`;

export const CloseButton = styled.button<MessageProps>`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	& > svg {
		fill: ${({ currentTheme, messageType }) => ToastTheme[currentTheme][messageType].color};
	}
`;

export const ProgressBar = styled.div<ProgressBarProps>`
	position: absolute;
	left: 0;
	bottom: 0;
	height: ${progressBarHeight};
	background-color: ${({ currentTheme, messageType }) =>
		ToastTheme[currentTheme][messageType].progressBarColor};
	animation: progressBar ${({ duration }) => duration}ms linear;

	@keyframes progressBar {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
`;
