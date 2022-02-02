import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@styles/Theme';
import TextInput from '../TextInput';

test('TextInput component layout on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<TextInput htmlFor="test-input" labelName="test" />
		</CustomWrapper>
	);

	const textInput = screen.getByRole('textbox', { name: 'test' });
	expect(textInput).toHaveStyle('color: #000');
	expect(textInput).toHaveStyle('background-color: #FFF');
	expect(textInput).toHaveStyle('border: 1px solid #53585E');
});

test('TextInput component layout on dark theme', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<TextInput htmlFor="test-input" labelName="test" />
		</CustomWrapper>
	);

	const textInput = screen.getByRole('textbox', { name: 'test' });
	expect(textInput).toHaveStyle('color: #FFF');
	expect(textInput).toHaveStyle('background-color: #323645');
	expect(textInput).toHaveStyle('border: 1px solid #62626D');
});

test('TextInput component layout on error', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<TextInput htmlFor="test-input" labelName="test" errorLabel="error label" isError />
		</CustomWrapper>
	);

	const textInput = screen.getByRole('textbox', { name: 'test' });
	const label = screen.getByText('test');
	const errorLabel = screen.getByText('error label');
	expect(textInput).toHaveStyle('border: 1px solid #FA5252');
	expect(label).toHaveStyle('color: #FA5252');
	expect(errorLabel).toHaveStyle('color: #FA5252');
});
