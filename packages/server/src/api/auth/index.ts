import express from 'express';
import checkAuth from './checkAuth';
import google from './google';
import naver from './naver';
import logOut from './logOut';

export default (): express.Router => {
	const router = express.Router();
	router.use('/check', checkAuth());
	router.use('/google', google());
	router.use('/naver', naver());
	router.use('/logout', logOut());

	return router;
};
