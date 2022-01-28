import { ReactNode, SyntheticEvent } from 'react';
import { Times } from '@components/Icon';
import Button from '@components/Button';
import { ModalBackdrop, ModalContentWrap, CloseButtonWrap } from './style';

interface Props {
	children: ReactNode;
	closeFunction: (e: SyntheticEvent, stopBubble?: boolean) => void;
}

export default function Modal({ children, closeFunction }: Props) {
	return (
		<ModalBackdrop
			aria-label="Modal backdrop"
			alignItems="center"
			justifyContent="center"
			onClick={closeFunction}
		>
			<ModalContentWrap as="dialog" width="fit-content" height="fit-content" aria-label="Modal">
				<CloseButtonWrap>
					<Button
						type="button"
						width="auto"
						height="auto"
						aria-label="Close modal button"
						onClick={e => closeFunction(e, false)}
					>
						<Times />
					</Button>
				</CloseButtonWrap>
				{children}
			</ModalContentWrap>
		</ModalBackdrop>
	);
}
