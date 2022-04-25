export default {
	oauth: {
		redirectBaseUrl: process.env.OAUTH_REDIRECT_BASE_URL,
		google: {
			baseUrl: process.env.GOOGLE_OAUTH_BASE_URL,
			scope: process.env.GOOGLE_OAUTH_SCOPE,
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
		},
		naver: {
			baseUrl: process.env.NAVER_OAUTH_BASE_URL,
			clientId: process.env.NAVER_OAUTH_CLIENT_ID,
			state: process.env.NAVER_OAUTH_STATE
		}
	},
	avatarImageBaseUrl: process.env.AVATAR_IMAGE_BASE_URL,
	apiServerUrl: process.env.API_SERVER_URL,
	socketServerUrl: process.env.SOCKET_SERVER_URL
};
