import express from 'express';

export default function errorHandler(
	err: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	if (err.message === 'Invalid session') {
		res.status(401).json({ message: 'Invalid session' });
		return;
	}

	res.status(500).json({ message: 'Internal server error' });
	return;
}
