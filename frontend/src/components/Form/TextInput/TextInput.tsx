import { ChangeEventHandler } from 'react';
import { ExclamationMark } from '@components/index';
import * as Style from '../styles';

type TextInputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

interface Props {
	htmlFor: string;
	type?: TextInputType;
	labelName?: string;
	errorLabel?: string;
	value?: string | number;
	readOnly?: boolean;
	handleChange?: ChangeEventHandler;
	isError?: boolean | (() => boolean);
}

export default function TextInput({
	htmlFor,
	type = 'text',
	labelName,
	errorLabel,
	value,
	readOnly = false,
	handleChange,
	isError
}: Props) {
	const handleError = () => {
		if (typeof isError === 'function') return isError();
		return isError;
	};

	return (
		<Style.InputContainer>
			<Style.TextInput
				id={htmlFor}
				type={type}
				value={value}
				onChange={handleChange}
				readOnly={readOnly}
				isError={handleError()}
			/>
			<Style.TextInputLabel htmlFor={htmlFor} isError={handleError()}>
				{labelName}
			</Style.TextInputLabel>
			{handleError() && <ExclamationMark fill="red" />}
			{handleError() && <Style.ErrorLabel>{errorLabel}</Style.ErrorLabel>}
		</Style.InputContainer>
	);
}
