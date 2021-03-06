import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import useVerticalScrollBar from '@hooks/ScrollBar/useVerticalScrollBar';
import { SearchSymbolItem } from '@types';
import MatchWord from './MatchWord';
import * as Style from './styles';

interface Props {
	searchQuery: string;
	searchResults: SearchSymbolItem[];
	onResultClick: any;
}

export default function SearchResultList({ searchQuery, searchResults, onResultClick }: Props) {
	const outerContainerRef = useRef<HTMLDivElement>(null);
	const innerContainerRef = useRef<HTMLUListElement>(null);
	const { VerticalScrollBarThumb, calculateThumbY, verticalThumbH, verticalThumbRef } =
		useVerticalScrollBar({
			innerContainerRef,
			outerContainerRef,
			outerContainerBorderWidth: 1
		});

	return (
		<Style.SearchResultContainer ref={outerContainerRef} onScroll={calculateThumbY}>
			<VerticalScrollBarThumb ref={verticalThumbRef} height={verticalThumbH} />
			<Style.SearchResultList ref={innerContainerRef}>
				{searchResults.map(({ ticker, name, exchange, type }) => (
					<Style.SearchResultListItem
						id="search-list-item"
						key={`${ticker}${uuid()}`}
						onClick={() => onResultClick(ticker, name)}
					>
						<MatchWord type="name" word={name} query={searchQuery} />
						<Style.SearchResultLowerSection>
							<MatchWord type="ticker" word={ticker} query={searchQuery} />
							<Style.SearchResultType>{stockTypeKor[type]}-</Style.SearchResultType>
							<Style.SearchResultExchange>{exchange}</Style.SearchResultExchange>
						</Style.SearchResultLowerSection>
					</Style.SearchResultListItem>
				))}
			</Style.SearchResultList>
		</Style.SearchResultContainer>
	);
}

const stockTypeKor = {
	ad: 'ADR',
	cef: '폐쇄형 펀드',
	cs: '보통주',
	et: 'ETF',
	oef: '개방형 펀드',
	ps: '우선주',
	rt: '신주인수권',
	struct: '구조화 상품',
	ut: '유닛',
	wt: '워런트'
} as const;
