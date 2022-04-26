import express, { NextFunction, Request, Response } from 'express';
import { naverService, userService, sessionService, cookieService } from '@services/index';
import envConfig from '@config';

interface NaverOAuthQuery {
	state: string;
	code: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/callback',
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const { state, code } = req.query as unknown as NaverOAuthQuery;
			const clientURL = envConfig.origin as string;
			const authType = 'naver';

			try {
				const accessToken = await naverService.getAccessToken(code, state);
				const { email, username } = await naverService.getEmailAndUsername(accessToken);
				const userId = await userService.getUserId(email);

				if (userId === -1) {
					const newUserId = await userService.createNewUser({ authType, username, email });
					const sessionId = await sessionService.createSession(newUserId);
					cookieService.issueCookie({
						res,
						name: 'uaat',
						value: sessionId,
						options: { maxAge: Number(envConfig.maxCookieAge ?? 0) }
					});
					cookieService.issueCookie({
						res,
						name: 'login_token',
						value: sessionId
					});
					res.redirect(`${clientURL}/welcome?username=${encodeURIComponent(username)}`);
					return;
				}

				const sessionId = await sessionService.createSession(userId);
				cookieService.issueCookie({
					res,
					name: 'uaat',
					value: sessionId,
					options: { maxAge: Number(envConfig.maxCookieAge ?? 0) }
				});
				cookieService.issueCookie({
					res,
					name: 'login_token',
					value: sessionId
				});
				res.redirect(`${clientURL}${state}`);
				return;
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
