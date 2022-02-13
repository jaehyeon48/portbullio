import express from 'express';
import avatar from './avatar';

export default (): express.Router => {
	const router = express.Router();
	router.use('/avatar', avatar());

	return router;
};
