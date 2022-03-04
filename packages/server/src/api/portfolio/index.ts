import express from 'express';
import portfolio from './portfolio';
import holdings from './holdings';

export default (): express.Router => {
	const router = express.Router();
	router.use('/', portfolio());
	router.use('/', holdings());

	return router;
};
