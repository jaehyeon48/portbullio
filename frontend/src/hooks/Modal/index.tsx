import { useState, SyntheticEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from 'styled-components';
import AppProviders from '@components/AppProviders';
import { CloseModalFn } from '@types';
import Modal from '@components/Modal';

type OpenModalFn = (e: SyntheticEvent, children: ReactNode) => void;
type ToggleModalFn = (e: SyntheticEvent) => void;

interface UseModalReturnType {
	isOpen: boolean;
	openModal: OpenModalFn;
	closeModal: CloseModalFn;
	toggleModal: ToggleModalFn;
}

export function useModal(): UseModalReturnType {
	const modalRootElem = document.getElementById('modal-root') as Element;
	const [isOpen, setIsOpen] = useState(false);
	const theme = useTheme();

	const closeModal = (e: SyntheticEvent, stopBubble = true) => {
		if (stopBubble && e.target !== e.currentTarget) return;
		e.stopPropagation();
		ReactDOM.unmountComponentAtNode(modalRootElem);
		setIsOpen(false);
	};

	const openModal = (e: SyntheticEvent, children: ReactNode) => {
		e.stopPropagation();
		ReactDOM.render(
			<AppProviders theme={theme}>
				<Modal closeFunction={closeModal}>{children}</Modal>
			</AppProviders>,
			modalRootElem
		);
		setIsOpen(true);
	};

	const toggleModal = (e: SyntheticEvent) => {
		e.stopPropagation();
		setIsOpen(prev => !prev);
	};

	return { isOpen, openModal, closeModal, toggleModal };
}
