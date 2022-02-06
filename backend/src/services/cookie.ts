import { Response } from 'express';
import { COOKIE_MAX_AGE } from '@constants';

export function issueUAAT(res: Response, sessionId: string): void {
	res.cookie('uaat', sessionId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: COOKIE_MAX_AGE
	});
}
