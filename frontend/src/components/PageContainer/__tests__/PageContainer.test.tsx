import { render, screen } from '@api/testingLibrary';
import { navbarWidth } from '@constants';
import PageContainer from '../PageContainer';

test('Page container layout test', () => {
	render(
		<PageContainer ariaLabel="page container test">
			<div />
		</PageContainer>
	);

	const pageContainer = screen.getByLabelText('page container test');
	expect(pageContainer).toHaveStyle(`width: calc(100% - ${navbarWidth}px)`);
});
