import express from 'express';
import market from './market';

export default (): express.Router => {
	const router = express.Router();
	router.use('/market', market());

	return router;
};
