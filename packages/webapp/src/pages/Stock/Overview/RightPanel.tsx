import * as Style from './styles';

export default function RightPanel() {
	return (
		<Style.RightPanelContainer aria-label="Stock overview right panel">
			<Style.UpperPanel>
				<Style.PanelItem>
					<Style.PanelItemTitle>시가</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>종가</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>저가</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>전일 종가</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
			</Style.UpperPanel>
			<Style.LowerPanel>
				<Style.PanelItem>
					<Style.PanelItemTitle>52주 최고</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>52주 최저</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>시가 총액</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>거래량</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>평균 거래량 &#40;3M&#41;</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>P/E &#40;TTM&#41;</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
				<Style.PanelItem>
					<Style.PanelItemTitle>EPS</Style.PanelItemTitle>
					<Style.PanelItemValue>123.12</Style.PanelItemValue>
				</Style.PanelItem>
			</Style.LowerPanel>
		</Style.RightPanelContainer>
	);
}
