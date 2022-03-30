import { createSecureServer } from 'http2';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Server } from 'socket.io';
import loaders from '@loaders';
import envConfig from '@config';
import logger from '@lib/winston';
import { listenSocketEvents } from '@services/index';

async function startServer() {
	const httpServer = createSecureServer({
		allowHTTP1: true,
		key: readFileSync(resolve(__dirname, '../', 'private.pem')),
		cert: readFileSync(resolve(__dirname, '../', 'public.pem'))
	});

	await loaders();
	const io = new Server(httpServer as any, {
		cors: {
			origin: envConfig.origin
		}
	});

	httpServer.listen(envConfig.port);
	logger.info(`### Session server listening on port: ${envConfig.port} ###`);
	listenSocketEvents(io);
}

startServer();
