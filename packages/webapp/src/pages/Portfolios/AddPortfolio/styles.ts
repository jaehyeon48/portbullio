import styled from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

export const Container = styled.div`
	padding: 0 1em;
	width: 320px;
`;

export const Form = styled.form`
	width: 100%;
	& > div {
		width: 100%;
	}

	& input[type='text'] {
		width: 100%;
	}
`;

export const RadioInputContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 28px;
`;

export const RadioLabel = styled.label`
	display: flex;
	align-items: center;
	border: 1px solid var(--baseBorderColor);
	border-radius: 4px;
	padding: 0.3em 0.7em;
	cursor: pointer;

	& > svg {
		margin-right: 4px;
	}
`;

export const RadioInput = styled.input`
	display: none;

	&:checked + ${RadioLabel} {
		background-color: var(--lightBlue);
		color: var(--white);

		& > svg {
			fill: var(--white);
		}
	}
`;

export const AddButton = styled.button`
	${buttonMixin};
	width: 100%;
	border-radius: 4px;
	margin-top: 30px;
	padding: 0.3em 0.6em;
	background-color: var(--primary);
	color: var(--white);
`;

export const Header = styled.header`
	font-size: 24px;
	text-align: center;
	padding-bottom: 1em;
`;
