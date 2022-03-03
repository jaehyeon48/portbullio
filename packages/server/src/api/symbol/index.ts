import express from 'express';
import symbol from './symbol';

export default (): express.Router => {
	const router = express.Router();
	router.use('/', symbol());

	return router;
};
