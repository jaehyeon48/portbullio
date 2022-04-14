import { Server } from 'socket.io';
import schedule from 'node-schedule';
import * as Lib from '@lib/index';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	IsMarketOpen
} from '@portbullio/shared/src/types';
import * as Services from '@services/index';
import listenSocketEvents from './listenSocketEvents';

const marketStatus: { isMarketOpen: IsMarketOpen } = { isMarketOpen: false };

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await Lib.marketStatusRedisClient.connect();
	await Lib.realtimeStockDataSubscribersRedisClient.connect();
	await Lib.majorIndicesDataSubscribersRedisClient.connect();
	await Lib.topStocksDataSubscribersRedisClient.connect();
	await Lib.realtimeStockDataRedisClient.connect();
	await Lib.majorIndicesDataRedisClient.connect();
	await Lib.topStocksDataRedisClient.connect();

	await Lib.realtimeStockDataSubscribersRedisClient.flushDb();
	await Lib.majorIndicesDataSubscribersRedisClient.flushDb();
	await Lib.topStocksDataSubscribersRedisClient.flushDb();

	marketStatus.isMarketOpen = await Services.getCurrentMarketState();

	schedule.scheduleJob('0 30 22 * * *', async () => {
		const isMarketOpenNow = await Services.fetchIsMarketOpen();
		await Lib.marketStatusRedisClient.set('isMarketOpen', String(isMarketOpenNow));
		marketStatus.isMarketOpen = isMarketOpenNow;
		Lib.logger.info(`Checked Market Status. Current state: ${isMarketOpenNow ? 'open' : 'close'}`);
		if (marketStatus.isMarketOpen) Services.updatePrice(marketStatus);
	});

	schedule.scheduleJob('0 0 5 * * *', async () => {
		const isMarketOpenNow = await Services.fetchIsMarketOpen();
		await Lib.marketStatusRedisClient.set('isMarketOpen', String(isMarketOpenNow));
		marketStatus.isMarketOpen = isMarketOpenNow;
		Lib.logger.info('Checked Market Status');
	});

	Lib.realtimeStockDataRedisClient.on('error', err =>
		Lib.logger.error('Price Redis Client Error', err)
	);
	Lib.realtimeStockDataSubscribersRedisClient.on('error', err =>
		Lib.logger.error('User Redis Client Error', err)
	);
	Lib.marketStatusRedisClient.on('error', err =>
		Lib.logger.error('Market Status Redis Client Error', err)
	);

	listenSocketEvents(io);
	if (marketStatus.isMarketOpen) Services.updatePrice(marketStatus);
	Lib.eventEmitter.on('EMIT_REALTIME_DATA', () => Services.broadcastRealtimeData(io));
	Lib.eventEmitter.on('EMIT_MAJOR_INDICES_DATA', () => Services.emitMajorIndicesData(io));
	Lib.eventEmitter.on('BROADCAST_TOP_STOCKS_DATA', () => Services.broadcastTopStocksData(io));
}
