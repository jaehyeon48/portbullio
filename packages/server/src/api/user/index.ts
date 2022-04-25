import express from 'express';
import avatar from './avatar';
import assetChart from './assetChart';
import info from './info';

export default (): express.Router => {
	const router = express.Router();
	router.use('/avatar', avatar());
	router.use('/asset-chart', assetChart());
	router.use('/info', info());

	return router;
};
