import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import MobileNavMenu from '../index';

test('Should display username, link menus and logout button', async () => {
	render(
		<CustomWrapper>
			<MobileNavMenu logOutFn={jest.fn()} toggleMobileNavMenu={jest.fn()} />
		</CustomWrapper>
	);

	const numOfLinkMemus = 5;
	expect(await screen.findByText('admin')).toBeInTheDocument();
	expect(screen.getAllByRole('link')).toHaveLength(numOfLinkMemus);
	expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
});
