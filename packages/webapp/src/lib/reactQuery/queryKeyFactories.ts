interface PortfolioKeys {
	all: readonly ['portfolios'];
	defaultId: () => readonly ['portfolios', 'defaultId'];
	holdings: (portfolioId: number) => readonly ['portfolios', number, 'holdings'];
}

interface AvatarKeys {
	url: 'avatarUrl';
}

export const portfolioKeys: PortfolioKeys = {
	all: ['portfolios'] as const,
	defaultId: () => [...portfolioKeys.all, 'defaultId'] as const,
	holdings: (portfolioId: number) => [...portfolioKeys.all, portfolioId, 'holdings'] as const
};

export const avatarKeys: AvatarKeys = {
	url: 'avatarUrl'
};
