import { useState, SyntheticEvent } from 'react';

type SetterFn = (e: SyntheticEvent) => void;

interface UseModalReturnType {
	isOpen: boolean;
	openModal: SetterFn;
	closeModal: SetterFn;
	toggleModal: SetterFn;
}

export function useModal(): UseModalReturnType {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (e: SyntheticEvent) => {
		e.stopPropagation();
		setIsOpen(true);
	};

	const closeModal = (e: SyntheticEvent) => {
		e.stopPropagation();
		setIsOpen(false);
	};

	const toggleModal = (e: SyntheticEvent) => {
		e.stopPropagation();
		setIsOpen(prev => !prev);
	};

	return { isOpen, openModal, closeModal, toggleModal };
}
