interface PortfolioKeys {
	all: readonly ['portfolios'];
	defaultId: () => readonly ['portfolios', 'defaultId'];
}

interface AvatarKeys {
	url: 'avatarUrl';
}

export const portfolioKeys: PortfolioKeys = {
	all: ['portfolios'] as const,
	defaultId: () => [...portfolioKeys.all, 'defaultId'] as const
};

export const avatarKeys: AvatarKeys = {
	url: 'avatarUrl'
};
