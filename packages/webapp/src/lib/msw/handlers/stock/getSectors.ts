import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { fakeGetSectorsResult } from '../../mockData/stock';

export default function getSectors(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json(fakeGetSectorsResult));
}
