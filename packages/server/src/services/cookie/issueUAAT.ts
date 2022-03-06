import { Response } from 'express';
import envConfig from '@config';

export default function issueUAAT(res: Response, sessionId: string): void {
	res.cookie('uaat', sessionId, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: Number(envConfig.maxCookieAge ?? 0)
	});
}
