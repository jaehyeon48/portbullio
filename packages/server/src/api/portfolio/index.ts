import express from 'express';
import portfolio from './portfolio';

export default (): express.Router => {
	const router = express.Router();
	router.use('/', portfolio());

	return router;
};
