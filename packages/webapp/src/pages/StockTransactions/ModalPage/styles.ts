import styled from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

export const Form = styled.form`
	padding: 10px 3px;
`;

export const MemoSubmitButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 3px 0 0 auto;
`;

export const MemoSubmitButton = styled.button`
	${buttonMixin};
	background-color: var(--deepOrange);
	color: var(--white);
	border-radius: 4px;
	padding: 0.3em 0.6em;
`;
