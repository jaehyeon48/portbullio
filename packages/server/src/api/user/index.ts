import express from 'express';
import avatar from './avatar';
import assetChart from './assetChart';

export default (): express.Router => {
	const router = express.Router();
	router.use('/avatar', avatar());
	router.use('/asset-chart', assetChart());

	return router;
};
