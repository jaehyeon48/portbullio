import axios from 'axios';
import envConfig from '@config';
import { MajorIndexData } from '@portbullio/shared/src/types';
import { FMPMajorIndexData } from '@types';

interface MajorIndicesRes {
	data: FMPMajorIndexData[];
}

export default async function fetchMajorIndicesData(): Promise<MajorIndexData[]> {
	const { data }: MajorIndicesRes = await axios.get(
		`https://financialmodelingprep.com/api/v3/quote/%5EDJI,%5EGSPC,%5EIXIC?apikey=${envConfig.fmpApiKey}`
	);

	return data.map(({ symbol, price, change, changesPercentage }) => ({
		ticker: symbol.replace('^', ''),
		price: String(price),
		change: String(change),
		changePercent: String(changesPercentage)
	}));
}
