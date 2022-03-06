import { Response } from 'express';

export default function issueLoginToken(res: Response, sessionId: string): void {
	res.cookie('login_token', sessionId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true
	});
}
