import { rest } from 'msw';
import envConfig from '@configs/env';
import * as portfolioMock from './portfolio';
import * as userMock from './user';

const handlers = [
	rest.get(`${envConfig.serverEndPoint}/portfolios`, portfolioMock.getPortfolioList),
	rest.get(`${envConfig.serverEndPoint}/portfolios/default`, portfolioMock.getDefaultPortfolio),
	rest.get(`${envConfig.serverEndPoint}/portfolios/1/holdings`, portfolioMock.getAllHoldings),
	rest.get(
		`${envConfig.serverEndPoint}/portfolios/1/holdings/AAPL`,
		portfolioMock.getStockTransactionLogs
	),
	rest.get(`${envConfig.serverEndPoint}/user/avatar`, userMock.getAvatar)
];

export default handlers;
