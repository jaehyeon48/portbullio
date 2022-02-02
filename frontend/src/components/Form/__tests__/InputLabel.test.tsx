import { render, screen, CustomWrapper, userEvent } from '@api/testingLibrary';
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
