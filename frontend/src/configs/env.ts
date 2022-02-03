export default {
	serverEndPoint: process.env.SERVER_END_POINT,
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
