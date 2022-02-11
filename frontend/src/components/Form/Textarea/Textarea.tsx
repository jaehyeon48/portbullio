import { ChangeEventHandler } from 'react';
import { ExclamationMark } from '@components/index';
import * as Style from '../styles';

interface Props {
	htmlFor: string;
	rows?: number;
	cols?: number;
	labelName?: string;
	errorLabel?: string;
	value?: string | number;
	readOnly?: boolean;
	handleChange?: ChangeEventHandler;
	isError?: boolean | (() => boolean);
}

export default function Textarea({
	htmlFor,
	rows = 30,
	cols = 20,
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
			<Style.Textarea
				id={htmlFor}
				value={value}
				rows={rows}
				cols={cols}
				onChange={handleChange}
				readOnly={readOnly}
				isError={handleError()}
			/>
			<Style.TextareaLabel htmlFor={htmlFor} isError={handleError()}>
				{labelName}
			</Style.TextareaLabel>
			{handleError() && <ExclamationMark fill="red" />}
			{handleError() && <Style.ErrorLabel>{errorLabel}</Style.ErrorLabel>}
		</Style.InputContainer>
	);
}
