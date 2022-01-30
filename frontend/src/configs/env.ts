export default {
	oauth: {
		baseRedirectURI: process.env.BASE_REDIRECT_URI,
		google: {
			endPoint: process.env.GOOGLE_OAUTH_END_POINT,
			scope: process.env.GOOGLE_OAUTH_SCOPE,
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
		}
	}
};
