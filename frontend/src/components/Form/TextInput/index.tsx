import { ChangeEventHandler } from 'react';
import { ExclamationMark } from '@components/Icon';
import { TextInputContainer, StyledTextInput, StyledTextLabel } from './style';

type TextInputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

interface Props {
	htmlFor: string;
	type?: TextInputType;
	labelName?: string;
	value?: string | number;
	readOnly?: boolean;
	handleChange?: ChangeEventHandler;
	isError?: boolean;
}

export default function TextInput({
	htmlFor,
	type = 'text',
	labelName,
	value,
	readOnly = false,
	handleChange,
	isError
}: Props) {
	return (
		<TextInputContainer>
			<StyledTextInput
				id={htmlFor}
				type={type}
				value={value}
				onChange={handleChange}
				readOnly={readOnly}
				isError={isError}
			/>
			<StyledTextLabel htmlFor={htmlFor} isError={isError}>
				{labelName}
			</StyledTextLabel>
			{isError && <ExclamationMark fill="red" />}
		</TextInputContainer>
	);
}
