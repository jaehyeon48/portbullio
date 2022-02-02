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
`;

export const StyledTextLabel = styled.label`
	position: absolute;
	color: ${({ theme }) => theme.input.labelColor};
	top: 0.2em;
	left: 0.5em;
`;
