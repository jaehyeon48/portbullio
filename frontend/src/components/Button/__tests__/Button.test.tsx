import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@styles/Theme';
import Button from '../Button';

test('Card component layout on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Button width="123px" height="456px" aria-label="button component test">
				<div />
			</Button>
		</CustomWrapper>
	);

	const button = screen.getByLabelText('button component test');
	expect(button).toHaveStyle('width: 123px');
	expect(button).toHaveStyle('height: 456px');
	expect(button).toHaveStyle('color: #000');
});

test('Card component layout on dark theme', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Button aria-label="button component test">
				<div />
			</Button>
		</CustomWrapper>
	);

	const button = screen.getByLabelText('button component test');
	expect(button).toHaveStyle('width: 100%');
	expect(button).toHaveStyle('height: 100%');
	expect(button).toHaveStyle('color: #fff');
});

test('Card component not applying flex test', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Button aria-label="button component test" justifyContent="center">
				<div />
			</Button>
		</CustomWrapper>
	);

	const button = screen.getByLabelText('button component test');
	expect(button).toHaveStyle('display: block');
	expect(button).not.toHaveStyle('justify-content: center');
});

test('Card component applying flex test', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Button flex aria-label="button component test" justifyContent="center">
				<div />
			</Button>
		</CustomWrapper>
	);

	const button = screen.getByLabelText('button component test');
	expect(button).toHaveStyle('display: flex');
	expect(button).toHaveStyle('justify-content: center');
});
