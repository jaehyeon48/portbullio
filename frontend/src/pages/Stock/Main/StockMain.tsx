import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { DynamicCaret } from '@components/index';
import * as Style from './styles';

function isValidTicker() {
	return true;
}

export default function StockMain() {
	const navigate = useNavigate();
	const { ticker } = useParams() as { ticker: string };

	useEffect(() => {
		if (!isValidTicker()) {
			navigate('/404');
		}
	}, [navigate, ticker]);

	return (
		<>
			<Style.StockMainSection aria-label="Stock info">
				<Style.HeaderSection>
					<Style.CompanyName aria-label="Company name">Apple Inc.</Style.CompanyName>
					<Style.TickerContainer>
						<Style.Ticker aria-label="Ticker">{ticker.toUpperCase()}</Style.Ticker>
						<Style.StockExchange>NASDAQ</Style.StockExchange>
					</Style.TickerContainer>
				</Style.HeaderSection>
				<Style.PriceSection value={-1}>
					<Style.CurrentPrice aria-label="Current price">
						<Style.CurrencySymbol aria-label="Currency symbol">$</Style.CurrencySymbol>
						172.19
					</Style.CurrentPrice>
					<Style.PriceChangeContainer>
						<Style.PriceChange aria-label="Price change">
							<DynamicCaret value={-1} width={24} height={24} marginTop={4} />
							3.34
						</Style.PriceChange>
						&#40;-0.45%&#41;
					</Style.PriceChangeContainer>
				</Style.PriceSection>
				<Style.StockMenuSection aria-label="Stock page links">
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
