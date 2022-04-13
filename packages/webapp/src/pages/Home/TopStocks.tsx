import { RealtimeData } from '@portbullio/shared/src/types';
import { formatCurrency, prefixPlusChar } from '@utils';
import * as Style from './styles';

interface Props {
	stockList: RealtimeData[];
}

export default function TopStocks({ stockList }: Props) {
	return (
		<>
			{stockList.map(({ ticker, changePercent, price }) => (
				<Style.TopStocksListItem key={ticker} as="li" bgColorOnHover>
					<Style.TopStocksListItemLink to={`stock/${ticker}/overview`}>
						<Style.TopStocksListItemTicker>{ticker}</Style.TopStocksListItemTicker>
						<Style.TopStocksListItemChangePercent value={changePercent}>
							{prefixPlusChar(changePercent)}
							{changePercent.toFixed(2)}%
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
