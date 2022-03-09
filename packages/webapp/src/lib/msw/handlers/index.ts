import { rest } from 'msw';
import envConfig from '@configs/env';
import * as portfolioMock from './portfolio';

const handlers = [
	rest.get(`${envConfig.serverEndPoint}/portfolios/default`, portfolioMock.getDefaultPortfolio)
];

export default handlers;
