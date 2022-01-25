import express from 'express';
import config from '@config';
import loaders from '@loaders';

async function startServer() {
	const app = express();
	await loaders({ app });

	app.listen(config.port, () => {
		console.log(`
    ################################################
    🚀  Server listening on port: ${config.port} 🚀
    ################################################
    `);
	});
}

startServer();
