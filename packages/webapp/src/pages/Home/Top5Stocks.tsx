import * as Style from './styles';

interface StockItem {
	ticker: string;
	change: number;
	price: number;
}

interface Props {
	stockList: StockItem[];
}

export default function Top5Stocks({ stockList }: Props) {
	return (
		<>
			{stockList.map(({ ticker, change, price }) => (
				<Style.Top5ListItem key={ticker} as="li">
					<Style.Top5ListItemLink to={`stock/${ticker}/overview`}>
						<Style.Top5ListItemTicker>{ticker}</Style.Top5ListItemTicker>
						<Style.Top5ListItemChangePercent value={change}>
							{change > 0 && '+'}
							{change}%
						</Style.Top5ListItemChangePercent>
						<Style.Top5ListItemPrice>${price}</Style.Top5ListItemPrice>
					</Style.Top5ListItemLink>
				</Style.Top5ListItem>
			))}
		</>
	);
}
