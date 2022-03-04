import axios from 'axios';
import envConfig from '@configs/env';
import { SearchSymbolItem } from '@types';

interface ResponseType {
	data: SearchSymbolItem[];
}

export default async function searchSymbols(query: string): Promise<SearchSymbolItem[]> {
	const { serverEndPoint } = envConfig;

	if (query === '') return [];
	try {
		const { data } = (await axios.get(`${serverEndPoint}/symbol?query=${query}`)) as ResponseType;
		return data;
	} catch (error) {
		return [];
	}
}
