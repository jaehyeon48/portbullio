import express from 'express';
import checkAuth from './checkAuth';
import google from './google';

export default (): express.Router => {
	const router = express.Router();
	router.use('/check', checkAuth());
	router.use('/google', google());

	return router;
};
