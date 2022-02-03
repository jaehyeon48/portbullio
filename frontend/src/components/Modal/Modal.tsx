import { ReactNode, SyntheticEvent } from 'react';
import { Times } from '@components/Icon';
import Button from '@components/Button';
import * as Style from './styles';

interface Props {
	children: ReactNode;
	closeFunction: (e: SyntheticEvent, stopBubble?: boolean) => void;
}

export default function Modal({ children, closeFunction }: Props) {
	return (
		<Style.ModalBackdrop
			aria-label="Modal backdrop"
			alignItems="center"
			justifyContent="center"
			onClick={closeFunction}
		>
			<Style.ModalContentContainer
				as="dialog"
				width="fit-content"
				height="fit-content"
				aria-label="Modal"
			>
				<Style.CloseButtonContainer>
					<Button
						type="button"
						width="auto"
						height="auto"
						aria-label="Close modal button"
						onClick={e => closeFunction(e, false)}
					>
						<Times />
					</Button>
				</Style.CloseButtonContainer>
				{children}
			</Style.ModalContentContainer>
		</Style.ModalBackdrop>
	);
}
