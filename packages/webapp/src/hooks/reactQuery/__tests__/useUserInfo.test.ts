import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import { fakeUserInfo } from '@lib/msw/mockData/user';
import useUserInfo from '../useUserInfo';

test('useUserInfo test', async () => {
	const { result, waitFor } = renderHook(() => useUserInfo(), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual(fakeUserInfo);
});
