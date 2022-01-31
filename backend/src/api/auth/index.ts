import express from 'express';
import google from './google';

export default (): express.Router => {
	const router = express.Router();
	router.use('/google', google());

	return router;
};
