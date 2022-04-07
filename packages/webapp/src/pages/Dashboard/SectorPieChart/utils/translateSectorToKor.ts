export default function translateSectorToKor(sector: string) {
	if (sector === 'Basic Materials') return '원자재';
	if (sector === 'Communication Services') return '통신 서비스';
	if (sector === 'Consumer Cyclical') return '임의 소비재';
	if (sector === 'Consumer Defensive') return '필수 소비재';
	if (sector === 'Energy') return '에너지';
	if (sector === 'ETF') return 'ETF';
	if (sector === 'Financial Services') return '금융';
	if (sector === 'Healthcare') return '헬스케어';
	if (sector === 'Industrials') return '산업재';
	if (sector === 'Real Estate') return '부동산';
	if (sector === 'Technology') return '기술';
	if (sector === 'Utilities') return '유틸리티';
	return '기타';
}
