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
				const userId = await userService.getUserId(email, authType);

				if (userId === -1) {
					const newUserId = await userService.createNewUser({ authId: email, authType, username });
					const sessionId = await sessionService.createSession(newUserId);
					cookieService.issueUAAT(res, sessionId);
					cookieService.issueLoginToken(res, sessionId);
					res.redirect(`${clientURL}/welcome?username=${encodeURIComponent(username)}`);
					return;
				}

				const sessionId = await sessionService.createSession(userId);
				cookieService.issueUAAT(res, sessionId);
				cookieService.issueLoginToken(res, sessionId);
				res.redirect(clientURL);
				return;
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
