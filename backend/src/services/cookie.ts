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

export function issueLoginToken(res: Response, sessionId: string): void {
	res.cookie('login_token', sessionId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: COOKIE_MAX_AGE
	});
}

export function expireCookie(res: Response, cookieName: string): void {
	res.cookie(cookieName, '', {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: -1
	});
}
