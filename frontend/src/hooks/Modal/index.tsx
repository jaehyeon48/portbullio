import { useState, SyntheticEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import AppProviders from '@components/AppProviders';
import Modal from '@components/Modal';
import useThemeMode from '@hooks/Theme';
import { lightTheme, darkTheme } from '@styles/Theme';

type OpenModalFn = (e: SyntheticEvent, children: ReactNode) => void;
type SetterFn = (e: SyntheticEvent) => void;

interface UseModalReturnType {
	isOpen: boolean;
	openModal: OpenModalFn;
	closeModal: SetterFn;
	toggleModal: SetterFn;
}

export function useModal(): UseModalReturnType {
	const modalRootElem = document.getElementById('modal-root') as Element;
	const [isOpen, setIsOpen] = useState(false);
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	const closeModal = (e: SyntheticEvent) => {
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
