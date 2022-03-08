import { CustomWrapper, render, screen, userEvent } from '@api/testingLibrary';
import QueryErrorBoundary from '../QueryErrorBoundary';

describe('QueryErrorBoundary layout test', () => {
	test('Should have a correct error message', () => {
		render(
			<CustomWrapper>
				<QueryErrorBoundary errorMessage="에러 메시지 에러 메시지" isError refetch={jest.fn()}>
					<></>
				</QueryErrorBoundary>
			</CustomWrapper>
		);

		expect(screen.getByText('에러 메시지 에러 메시지')).toBeInTheDocument();
	});

	test('Should render a children component when there is no error', () => {
		render(
			<CustomWrapper>
				<QueryErrorBoundary
					errorMessage="에러 메시지 에러 메시지"
					isError={false}
					refetch={jest.fn()}
				>
					<div>자식 컴포넌트를 렌더링 해야 합니다.</div>
				</QueryErrorBoundary>
			</CustomWrapper>
		);

		expect(screen.getByText('자식 컴포넌트를 렌더링 해야 합니다.')).toBeInTheDocument();
	});

	test('Should trigger a refetch button', () => {
		const refetchFnMock = jest.fn();
		render(
			<CustomWrapper>
				<QueryErrorBoundary errorMessage="에러 메시지 에러 메시지" isError refetch={refetchFnMock}>
					<></>
				</QueryErrorBoundary>
			</CustomWrapper>
		);

		userEvent.click(screen.getByRole('button', { name: /재요청/ }));
		expect(refetchFnMock).toBeCalled();
	});
});
