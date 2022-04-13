import { formatCurrency } from '@utils';
import * as Style from './styles';

interface StockItem {
	ticker: string;
	change: number;
	price: number;
}

interface Props {
	stockList: StockItem[];
}

export default function TopStocks({ stockList }: Props) {
	return (
		<>
			{stockList.map(({ ticker, change, price }) => (
				<Style.TopStocksListItem key={ticker} as="li" bgColorOnHover>
					<Style.TopStocksListItemLink to={`stock/${ticker}/overview`}>
						<Style.TopStocksListItemTicker>{ticker}</Style.TopStocksListItemTicker>
						<Style.TopStocksListItemChangePercent value={change}>
							{change > 0 && '+'}
							{change}%
						</Style.TopStocksListItemChangePercent>
						<Style.TopStocksListItemPrice>
							{formatCurrency(price, 'usd')}
						</Style.TopStocksListItemPrice>
					</Style.TopStocksListItemLink>
				</Style.TopStocksListItem>
			))}
		</>
	);
}
