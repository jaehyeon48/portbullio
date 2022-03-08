interface PortfolioKeys {
	all: readonly ['portfolios'];
	defaultId: () => readonly ['portfolios', 'defaultId'];
}

export const portfolioKeys: PortfolioKeys = {
	all: ['portfolios'] as const,
	defaultId: () => [...portfolioKeys.all, 'defaultId'] as const
};
