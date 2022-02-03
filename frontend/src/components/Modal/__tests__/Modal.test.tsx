import { render, screen, CustomWrapper, userEvent } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@styles/Theme';
import Modal from '../Modal';

test('Modal component layout on light theme', () => {
	const mockFn = jest.fn();

	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal-root');
	document.body.appendChild(modalRoot);

	render(
		<CustomWrapper theme={lightTheme}>
			<Modal closeFunction={mockFn}>
				<div>this is modal</div>
			</Modal>
		</CustomWrapper>
	);

	const modal = screen.getByLabelText('Modal');
	const modalBackdrop = screen.getByLabelText('Modal backdrop');
	const closeButton = screen.getByLabelText('Close modal button');

	expect(modal).toHaveStyle('background-color: #F8F9FA');
	expect(modalBackdrop).toHaveStyle('background-color: rgba(28, 35, 41, 0.25)');
	userEvent.click(closeButton);
	expect(mockFn).toBeCalled();
});

test('Modal component layout on dark theme', () => {
	const mockFn = jest.fn();

	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal-root');
	document.body.appendChild(modalRoot);

	render(
		<CustomWrapper theme={darkTheme}>
			<Modal closeFunction={mockFn}>
				<div>this is modal</div>
			</Modal>
		</CustomWrapper>
	);

	const modal = screen.getByLabelText('Modal');
	const modalBackdrop = screen.getByLabelText('Modal backdrop');
	expect(modal).toHaveStyle('background-color: #1A1C34');
	expect(modalBackdrop).toHaveStyle('background-color: rgba(120,122,124,0.35)');
});
