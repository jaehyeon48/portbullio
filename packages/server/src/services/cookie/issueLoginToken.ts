import { Response } from 'express';
import { COOKIE_MAX_AGE } from '@constants';

export default function issueLoginToken(res: Response, sessionId: string): void {
	res.cookie('login_token', sessionId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: COOKIE_MAX_AGE
	});
}
