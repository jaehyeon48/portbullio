import { fakeTickers, fakeGetSectorsResult } from '@lib/msw/mockData/stock';
import getSectors from '../getSectors';

test('getSectors test', async () => {
	const result = await getSectors(fakeTickers);
	expect(result).toStrictEqual(fakeGetSectorsResult);
});
