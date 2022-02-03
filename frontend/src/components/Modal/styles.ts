import styled from 'styled-components';
import Card from '@components/Card';
import { buttonMixin, flexMixin } from '@styles/mixins';

export const ModalBackdrop = styled.div`
	${flexMixin}
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	backdrop-filter: blur(4px);
	background-color: ${({ theme }) => theme.modal.backdropBgColor};
`;

export const ModalContentContainer = styled(Card)`
	background-color: ${({ theme }) => theme.base.bgColor};
	padding: 1em;
`;

export const CloseButtonContainer = styled.div`
	position: relative;
	padding: 1.3em 0;
	width: 100%;

	& > button {
		position: absolute;
		top: 0;
		right: 0;
	}
`;

export const Button = styled.button`
	${buttonMixin};

	& > svg {
		fill: ${({ theme }) => (theme.currentTheme === 'light' ? '#000' : theme.base.colors.gray)};
	}
`;
