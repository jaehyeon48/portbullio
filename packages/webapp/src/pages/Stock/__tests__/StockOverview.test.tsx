import { CustomWrapper, render, screen } from '@lib/testingLibrary/react';
import StockOverviewRightPanel from '../Overview/RightPanel';

describe('Stock overview layout', () => {
	test('Should have a stock overview right panel', () => {
		render(
			<CustomWrapper>
				<StockOverviewRightPanel />
			</CustomWrapper>
		);

		expect(screen.getByTestId('stock-overview-right-panel')).toBeInTheDocument();
	});

	test('Should have stock overview right panel items', () => {
		render(
			<CustomWrapper>
				<StockOverviewRightPanel />
			</CustomWrapper>
		);

		expect(screen.getByText('시가')).toBeInTheDocument();
		expect(screen.getByText('종가')).toBeInTheDocument();
		expect(screen.getByText('저가')).toBeInTheDocument();
		expect(screen.getByText('전일 종가')).toBeInTheDocument();
		expect(screen.getByText('52주 최고')).toBeInTheDocument();
		expect(screen.getByText('52주 최저')).toBeInTheDocument();
		expect(screen.getByText('시가 총액')).toBeInTheDocument();
		expect(screen.getByText('거래량')).toBeInTheDocument();
		expect(screen.getByText('평균 거래량 (3M)')).toBeInTheDocument();
		expect(screen.getByText('P/E (TTM)')).toBeInTheDocument();
		expect(screen.getByText('EPS')).toBeInTheDocument();
	});
});
