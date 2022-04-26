import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { DynamicCaret } from '@components/index';
import { useTitle } from '@hooks/Title';
import { formatNum } from '@utils';
import { searchTickers } from '@api/stock';
import * as Style from './styles';
import { useCompanyName } from '../queries';

export default function StockMain() {
	const navigate = useNavigate();
	const { ticker } = useParams() as { ticker: string };
	useTitle(`Portbullio - ${ticker}`);
	const companyName = useCompanyName(ticker);

	useEffect(() => {
		(async () => {
			if (!(await isValidTicker(ticker))) {
				navigate('/invalid-ticker');
			}
		})();
	}, [navigate, ticker]);

	return (
		<>
			<Style.StockMainSection>
				<section>
					<Style.CompanyName aria-label="Company name">{companyName.data}</Style.CompanyName>
					<Style.TickerContainer>
						<Style.Ticker aria-label="Ticker name">{ticker.toUpperCase()}</Style.Ticker>
						<Style.StockExchange>NASDAQ</Style.StockExchange>
					</Style.TickerContainer>
				</section>
				<Style.PriceSection value={-1}>
					<Style.CurrentPrice aria-label="Current price">
						<Style.CurrencySymbol aria-label="Currency symbol">$</Style.CurrencySymbol>
						{formatNum(1234.56)}
					</Style.CurrentPrice>
					<Style.PriceChangeContainer>
						<Style.PriceChange aria-label="Price change">
							<DynamicCaret value={-1} width={24} height={24} />
							{formatNum(123.45)}
						</Style.PriceChange>
						&#40;-0.45%&#41;
					</Style.PriceChangeContainer>
				</Style.PriceSection>
				<Style.StockMenuSection>
					<Style.StockMenuLink to="overview">개요</Style.StockMenuLink>
					<Style.StockMenuLink to="info">기업 정보</Style.StockMenuLink>
					<Style.StockMenuLink to="financial">재무 정보</Style.StockMenuLink>
					<Style.StockMenuLink to="news">뉴스</Style.StockMenuLink>
				</Style.StockMenuSection>
			</Style.StockMainSection>
			<Outlet />
		</>
	);
}

async function isValidTicker(ticker: string) {
	const res = await searchTickers(ticker);
	if (res.length === 0) return false;
	return true;
}
