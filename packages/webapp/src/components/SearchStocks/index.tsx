import { useState, useEffect, SyntheticEvent, Dispatch } from 'react';
import { searchTickers } from '@api/stock';
import { Search as SearchIcon } from '@components/Icons';
import { SearchSymbolItem } from '@types';
import { asyncThrottleAndDebounce } from '@utils';
import ClearQueryButton from './ClearQueryButton';
import SearchResultList from './SearchResultList';
import * as Style from './styles';

interface Props {
	onResultClick: any;
}

const querySymbol = asyncThrottleAndDebounce(
	async (query: string, setter: Dispatch<React.SetStateAction<SearchSymbolItem[]>>) => {
		const searchRes = await searchTickers(query);
		setter(searchRes);
	},
	300
);

export default function SearchStocks({ onResultClick }: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<SearchSymbolItem[]>([]);

	useEffect(() => {
		document.addEventListener('click', closeSearchList);

		return () => {
			document.removeEventListener('click', closeSearchList);
		};
	}, []);

	useEffect(() => {
		let shouldCancel = false;
		if (shouldCancel) return () => {};
		if (searchQuery === '') return () => {};
		querySymbol(searchQuery, setSearchResults);

		return () => {
			shouldCancel = true;
		};
	}, [searchQuery]);

	function closeSearchList(e: Event) {
		const target = e.target as HTMLElement;
		if (target.closest('#search-list-item')) return;
		setSearchResults([]);
	}

	function handleQueryChange(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setSearchQuery(target.value);
	}

	function handleOnResultClick(ticker: string) {
		onResultClick(ticker);
		setSearchQuery('');
		setSearchResults([]);
	}

	return (
		<Style.Container>
			<Style.Input
				type="text"
				value={searchQuery}
				onChange={handleQueryChange}
				placeholder="종목 검색..."
			/>
			<SearchIcon width={18} height={18} />
			<ClearQueryButton query={searchQuery} setSearchQuery={setSearchQuery} />
			<SearchResultList
				searchQuery={searchQuery}
				searchResults={searchResults}
				onResultClick={handleOnResultClick}
			/>
		</Style.Container>
	);
}
