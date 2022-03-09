import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getPortfolioList(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			portfolios: [
				{
					id: 1,
					userId: 1,
					name: '포트폴리오 1',
					privacy: 'public',
					createdAt: '2022-03-07T12:37:15.000Z'
				},
				{
					id: 2,
					userId: 2,
					name: '포트폴리오 2',
					privacy: 'private',
					createdAt: '2022-03-08T00:26:00.000Z'
				}
			]
		})
	);
}
