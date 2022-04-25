import { rest } from 'msw';
import envConfig from '@configs/env';
import * as portfolioMock from './portfolio';
import * as stockMock from './stock';
import * as symbolMock from './symbol';
import * as userMock from './user';

const handlers = [
	rest.get(`${envConfig.apiServerUrl}/portfolios`, portfolioMock.getPortfolioList),
	rest.get(`${envConfig.apiServerUrl}/portfolios/default`, portfolioMock.getDefaultPortfolio),
	rest.get(`${envConfig.apiServerUrl}/portfolios/1/holdings`, portfolioMock.getAllHoldings),
	rest.get(
		`${envConfig.apiServerUrl}/portfolios/1/holdings/AAPL`,
		portfolioMock.getStockTransactionLogs
	),
	rest.post(`${envConfig.apiServerUrl}/portfolios`, portfolioMock.createPortfolio),
	rest.put(`${envConfig.apiServerUrl}/portfolios/default`, portfolioMock.editDefaultPortfolio),
	rest.patch(`${envConfig.apiServerUrl}/portfolios/1/name`, portfolioMock.editPortfolioName),
	rest.patch(`${envConfig.apiServerUrl}/portfolios/1/privacy`, portfolioMock.editPortfolioPrivacy),
	rest.delete(`${envConfig.apiServerUrl}/portfolios/1`, portfolioMock.deletePortfolio),
	rest.get(`${envConfig.apiServerUrl}/stock/market/status`, stockMock.checkIsMarketOpen),
	rest.get(`${envConfig.apiServerUrl}/symbol/sectors`, symbolMock.getSectors),
	rest.get(`${envConfig.apiServerUrl}/user/avatar`, userMock.getAvatar)
];

export default handlers;
