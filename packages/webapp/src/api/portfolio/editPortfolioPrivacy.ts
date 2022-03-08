import axios, { AxiosRequestConfig } from 'axios';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import envConfig from '@configs/env';

interface EditPortfolioPrivacyRes {
	data: {
		modifiedPortfolio: Portfolio;
	};
}

export default async function editPortfolioPrivacy(
	portfolioId: number,
	newPrivacy: PortfolioPrivacy
) {
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
