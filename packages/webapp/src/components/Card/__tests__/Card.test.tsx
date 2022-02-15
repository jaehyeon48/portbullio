import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@styles/Theme';
import Card from '../Card';

test('Card component layout on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Card width="123px" height="456px" aria-label="card component test">
				<div />
			</Card>
		</CustomWrapper>
	);

	const card = screen.getByLabelText('card component test');
	expect(card).toHaveStyle('background-color: #FFF');
	expect(card).toHaveStyle('width: 123px');
	expect(card).toHaveStyle('height: 456px');
	expect(card).toHaveStyle('box-shadow: 0px 0px 7px rgba(0,0,0,0.1)');
});

test('Card component layout on dark theme', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Card aria-label="card component test">
				<div />
			</Card>
		</CustomWrapper>
	);

	const card = screen.getByLabelText('card component test');

	expect(card).toHaveStyle('background-color: #26273B');
	expect(card).toHaveStyle('width: 100%');
	expect(card).toHaveStyle('height: 100%');
	expect(card).toHaveStyle('box-shadow: none');
});
