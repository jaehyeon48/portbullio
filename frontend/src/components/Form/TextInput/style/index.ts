import styled from 'styled-components';

export const TextInputContainer = styled.div`
	position: relative;
`;

export const StyledTextInput = styled.input`
	background-color: ${({ theme }) => theme.input.backgroundColor};
	border: 1px solid ${({ theme }) => theme.base.colors.darkGray};
	border-radius: 4px;
	color: ${({ theme }) => theme.base.textColor};
	padding: 1.8em 0.5em 0.15em;

	&:focus {
		border-color: ${({ theme }) => theme.base.colors.blue};
		box-shadow: 0 0 ${({ theme }) => (theme.currentTheme === 'light' ? '3' : '5')}px
			${({ theme }) => theme.base.colors.blue};
		outline: 1px solid ${({ theme }) => theme.base.colors.blue};
	}
`;

export const StyledTextLabel = styled.label`
	position: absolute;
	color: ${({ theme }) => theme.input.labelColor};
	top: 0.2em;
	left: 0.5em;

	${StyledTextInput}:focus + & {
		color: ${({ theme }) => theme.base.colors.blue};
	}
`;
