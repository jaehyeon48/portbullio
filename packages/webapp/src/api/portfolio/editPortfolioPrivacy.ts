import axios, { AxiosRequestConfig } from 'axios';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import envConfig from '@configs/env';

export interface EditPortfolioPrivacyArgs {
	portfolioId: number;
	newPrivacy: PortfolioPrivacy;
}

interface EditPortfolioPrivacyRes {
	data: {
		modifiedPortfolio: Portfolio;
	};
}

export async function editPortfolioPrivacy({ portfolioId, newPrivacy }: EditPortfolioPrivacyArgs) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPrivacy });
	const { data }: EditPortfolioPrivacyRes = await axios.patch(
		`${serverEndPoint}/portfolios/${portfolioId}/privacy`,
		formData,
		config
	);
	return data.modifiedPortfolio;
}
