interface PortfolioKeys {
	all: readonly ['portfolios'];
	defaultId: () => readonly ['portfolios', 'defaultId'];
	holdings: (portfolioId: number) => readonly ['portfolios', number, 'holdings'];
	stockTransactions: (
		portfolioId: number,
		ticker: string
	) => readonly ['portfolios', number, 'holdings', string];
	cash: (portfolioId: number) => readonly ['portfolios', number, 'cash'];
}

interface AvatarKeys {
	url: 'avatarUrl';
}

export const portfolioKeys: PortfolioKeys = {
	all: ['portfolios'] as const,
	defaultId: () => [...portfolioKeys.all, 'defaultId'] as const,
	holdings: (portfolioId: number) => [...portfolioKeys.all, portfolioId, 'holdings'] as const,
	stockTransactions: (portfolioId: number, ticker: string) =>
		[...portfolioKeys.holdings(portfolioId), ticker] as const,
	cash: (portfolioId: number) => [...portfolioKeys.all, portfolioId, 'cash'] as const
};

export const avatarKeys: AvatarKeys = {
	url: 'avatarUrl'
};
