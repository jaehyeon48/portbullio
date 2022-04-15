import { fakeTickers, fakeGetSectorsResult } from '@lib/msw/mockData/symbol';
import getSectors from '../getSectors';

test('getSectors test', async () => {
	const result = await getSectors(fakeTickers);
	expect(result).toStrictEqual(fakeGetSectorsResult);
});
