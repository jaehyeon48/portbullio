import styled from 'styled-components';

interface StyledTextInputProp {
	isError?: boolean;
}

export const TextInputContainer = styled.div`
	position: relative;
	width: fit-content;

	& > svg {
		position: absolute;
		top: 0.48em;
		right: 0.3em;
	}
`;

export const StyledTextInput = styled.input<StyledTextInputProp>`
	background-color: ${({ theme }) => theme.input.backgroundColor};
	border: 1px solid
		${({ theme, isError }) => (isError ? theme.base.colors.red : theme.base.colors.darkGray)};
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

export const StyledTextLabel = styled.label<StyledTextInputProp>`
	position: absolute;
	color: ${({ theme, isError }) => (isError ? theme.base.colors.red : theme.input.labelColor)};
	top: 0.2em;
	left: 0.5em;

	${StyledTextInput}:focus + & {
		color: ${({ theme }) => theme.base.colors.blue};
	}
`;

export const ErrorLabel = styled.small`
	position: absolute;
	color: ${({ theme }) => theme.base.colors.red};
	left: 3px;
	bottom: -22px;
	font-size: 14px;

	@media screen and (max-width: ${({ theme }) => theme.breakPoints.tabletLandscape}) {
		font-size: 12px;
		bottom: -20px;
	}
`;
