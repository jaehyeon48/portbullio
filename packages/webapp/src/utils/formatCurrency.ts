type Currency = 'usd' | 'krw';

export default function formatCurrency(inputNum: string | number, currency: Currency) {
	const num = typeof inputNum === 'string' ? Number(inputNum) : inputNum;
	return Intl.NumberFormat(currencyCode[currency], { style: 'currency', currency }).format(num);
}

const currencyCode = {
	usd: 'en-US',
	krw: 'ko-KR'
};
