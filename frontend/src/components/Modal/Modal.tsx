import * as React from 'react';
import { Times } from '@components/Icon';
import { CloseModalFn } from '@types';
import * as Style from './styles';

interface Props {
	children: React.ReactNode;
	closeFunction: CloseModalFn;
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
					<Style.Button
						type="button"
						aria-label="Close modal button"
						onClick={e => closeFunction(e, false)}
					>
						<Times />
					</Style.Button>
				</Style.CloseButtonContainer>
				{React.cloneElement(
					children as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
					{
						closeFunction
					}
				)}
			</Style.ModalContentContainer>
		</Style.ModalBackdrop>
	);
}
