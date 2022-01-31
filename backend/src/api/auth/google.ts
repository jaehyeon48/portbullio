import express, { Request, Response } from 'express';
import { googleService, userService, sessionService } from '@services';
import envConfig from '@config';
import { COOKIE_MAX_AGE } from '@constants';
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
				res.cookie('uaat', sessionId, {
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					maxAge: COOKIE_MAX_AGE
				});
				res.redirect(`${clientURL}/welcome?username=${encodeURIComponent(username)}`);
				return;
			}

			const sessionId = await sessionService.createSession(userId);
			res.cookie('uaat', sessionId, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: COOKIE_MAX_AGE
			});
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
