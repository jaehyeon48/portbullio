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
	rest.post(`${envConfig.serverEndPoint}/portfolios`, portfolioMock.createPortfolio),
	rest.put(`${envConfig.serverEndPoint}/portfolios/default`, portfolioMock.editDefaultPortfolio),
	rest.patch(`${envConfig.serverEndPoint}/portfolios/1/name`, portfolioMock.editPortfolioName),
	rest.patch(
		`${envConfig.serverEndPoint}/portfolios/1/privacy`,
		portfolioMock.editPortfolioPrivacy
	),
	rest.get(`${envConfig.serverEndPoint}/user/avatar`, userMock.getAvatar)
];

export default handlers;
