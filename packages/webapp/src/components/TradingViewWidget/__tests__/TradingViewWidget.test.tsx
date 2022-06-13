import { createRoot } from 'react-dom/client';
import TradingViewWidget from '../index';

// eslint-disable-next-line jest/expect-expect
test('Trading view widget renders successfully', () => {
	const container = document.createElement('div');
	const root = createRoot(container!);
	root.render(<TradingViewWidget width={100} height={100} symbol="AAPL" theme="light" />);
});
