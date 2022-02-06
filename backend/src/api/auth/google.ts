import express, { Request, Response } from 'express';
import { googleService, userService, sessionService, cookieService } from '@services';
import envConfig from '@config';
import { AxiosError } from 'axios';

interface GoogleOAuthState {
	prevPath: string;
}

interface GoogleOAuthQuery {
	state: string;
	code: string;
	scope: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/callback', async (req: Request, res: Response): Promise<void> => {
		const { state, code } = req.query as unknown as GoogleOAuthQuery;
		const { prevPath } = JSON.parse(state) as GoogleOAuthState;
		const clientURL = envConfig.origin;
		const authType = 'google';

		try {
			const accessToken = await googleService.getAccessToken(code);
			const { email, name: username } = await googleService.getEmailAndUsername(accessToken);
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
			res.redirect(`${clientURL}${prevPath}`);
			return;
		} catch (error) {
			const err = error as AxiosError;
			res.redirect(
				`${clientURL}/auth-error?code=${err.response?.status}&prevPath=${encodeURIComponent(
					prevPath
				)}`
			);
		}
	});

	return router;
};
