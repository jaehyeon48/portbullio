import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import config from '@config';
import logger from '@lib/winston';
import loaders from '@loaders';

async function startServer() {
	const app = express();
	const server = https.createServer(
		{
			key: fs.readFileSync(path.resolve(__dirname, '../', 'private.pem')),
			cert: fs.readFileSync(path.resolve(__dirname, '../', 'public.pem'))
		},
		app
	);

	await loaders({ app });
	server
		.listen(config.port, () => {
			logger.info(`### Server listening on port: ${config.port} ###`);
		})
		.on('error', err => {
			logger.error(err);
			process.exit(1);
		});
}

startServer();
