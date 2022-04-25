interface PortfolioKeys {
	all: readonly ['portfolios'];
	defaultId: () => readonly ['portfolios', 'defaultId'];
	holdings: (portfolioId: number) => readonly ['portfolios', number, 'holdings'];
	stockTransactionLogs: (
		portfolioId: number,
		ticker: string
	) => readonly ['portfolios', number, 'holdings', string];
	cash: (portfolioId: number) => readonly ['portfolios', number, 'cash'];
	sectors: (portfolioId: number) => readonly ['portfolios', number, 'holdings', 'sectors'];
}

interface AvatarKeys {
	url: 'avatarUrl';
}

interface UserKeys {
	profile: 'profile';
}

export const portfolioKeys: PortfolioKeys = {
	all: ['portfolios'] as const,
	defaultId: () => [...portfolioKeys.all, 'defaultId'] as const,
	holdings: (portfolioId: number) => [...portfolioKeys.all, portfolioId, 'holdings'] as const,
	stockTransactionLogs: (portfolioId: number, ticker: string) =>
		[...portfolioKeys.holdings(portfolioId), ticker] as const,
	cash: (portfolioId: number) => [...portfolioKeys.all, portfolioId, 'cash'] as const,
	sectors: (portfolioId: number) => [...portfolioKeys.holdings(portfolioId), 'sectors'] as const
};

export const avatarKeys: AvatarKeys = {
	url: 'avatarUrl'
};

export const userKeys: UserKeys = {
	profile: 'profile'
};
