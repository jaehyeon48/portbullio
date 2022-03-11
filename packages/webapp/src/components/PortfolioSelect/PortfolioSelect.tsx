import styled from 'styled-components';
import { usePortfolioList } from '@hooks/reactQuery';
import { useSelectPortfolioId, useSelectPortfolioIdUpdate } from './usePortfolioSelectId';

interface SelectMarginProps {
	margin?: string;
}

export default function PortfolioSelect() {
	const portfolios = usePortfolioList();
	const selectedPortfolioId = useSelectPortfolioId();
	const handleChangeSelect = useSelectPortfolioIdUpdate();

	return (
		<Select
			value={selectedPortfolioId}
			onChange={handleChangeSelect}
			defaultValue={-1}
			data-testid="select-portfolio"
		>
			<PlaceHolderOption value={-1}>포트폴리오 선택</PlaceHolderOption>
			{portfolios.data?.map(({ id, name }) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</Select>
	);
}

export const Select = styled.select<SelectMarginProps>`
	margin: ${({ margin }) => margin ?? '0 12px 0 0'};
	background-color: var(--navbarBgColor);
	color: var(--baseTextColor);
	outline: none;
	border-radius: 2px;
`;

export const PlaceHolderOption = styled.option`
	display: none;
`;
