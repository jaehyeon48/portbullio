import { render, screen, CustomWrapper, userEvent } from '@api/testingLibrary';
import { lightTheme } from '@src/styles/Theme';
import LogOut from '../LogOut';

test('LogOut page test', () => {
	const closeFn = jest.fn();

	render(
		<CustomWrapper theme={lightTheme}>
			<LogOut closeFunction={closeFn} />
		</CustomWrapper>
	);

	const cancelButton = screen.getByRole('button', { name: /취소/ });
	userEvent.click(cancelButton);
	expect(closeFn).toBeCalled();
});
