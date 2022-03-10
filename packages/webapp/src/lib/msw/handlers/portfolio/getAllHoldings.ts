import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getAllHoldings(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			holdings: [
				{
					ticker: 'AAPL',
					avgCost: 123.45,
					quantity: 123
				},
				{
					ticker: 'MSFT',
					avgCost: 123.45,
					quantity: 123
				}
			]
		})
	);
}
