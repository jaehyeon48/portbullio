import { ReactNode, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { Times } from '@components/Icon';
import { ModalBackdrop, ModalContentWrap, CloseButtonWrap } from './style';

interface Props {
	children: ReactNode;
	isOpen: boolean;
	closeFunction: (e: SyntheticEvent) => void;
}

export default function ({ children, isOpen, closeFunction }: Props) {
	return !isOpen
		? null
		: createPortal(
				<ModalBackdrop
					aria-label="Modal backdrop"
					alignItems="center"
					justifyContent="center"
					onClick={closeFunction}
				>
					<ModalContentWrap
						as="dialog"
						_width="fit-content"
						_height="fit-content"
						aria-label="Modal"
					>
						<CloseButtonWrap>
							<button type="button" aria-label="Close modal button" onClick={closeFunction}>
								<Times />
							</button>
						</CloseButtonWrap>
						{children}
					</ModalContentWrap>
				</ModalBackdrop>,
				document.getElementById('modal-root') as Element
		  );
}
