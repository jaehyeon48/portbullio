import { ChangeEventHandler } from 'react';
import { TextInputContainer, StyledTextInput, StyledTextLabel } from './style';

type TextInputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

interface Props {
	htmlFor: string;
	type?: TextInputType;
	labelName?: string;
	value?: string | number;
	readOnly?: boolean;
	handleChange?: ChangeEventHandler;
}

export default function TextInput({
	htmlFor,
	type = 'text',
	labelName,
	value,
	readOnly = false,
	handleChange
}: Props) {
	return (
		<TextInputContainer>
			<StyledTextInput
				id={htmlFor}
				type={type}
				value={value}
				onChange={handleChange}
				readOnly={readOnly}
			/>
			<StyledTextLabel htmlFor={htmlFor}>{labelName}</StyledTextLabel>
		</TextInputContainer>
	);
}
