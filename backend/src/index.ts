import express from 'express';
import config from '@config';
import loaders, { logger } from '@loaders';

async function startServer() {
	const app = express();
	await loaders({ app });

	app
		.listen(config.port, () => {
			logger.info(`### Server listening on port: ${config.port} ###`);
		})
		.on('error', err => {
			logger.error(err);
			process.exit(1);
		});
}

startServer();
