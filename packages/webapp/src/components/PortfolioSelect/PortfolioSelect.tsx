import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPortfolios } from '@api/portfolio';

interface Props {
	value: number | undefined;
	onChange: ChangeEventHandler;
}

interface SelectMarginProps {
	margin?: string;
}

export default function PortfolioSelect({ value, onChange }: Props) {
	const { data: portfolios } = useQuery('portfolioList', getPortfolios, {
		staleTime: Infinity
	});

	return (
		<Select value={value} onChange={onChange} defaultValue={-1} data-testid="select-portfolio">
			<PlaceHolderOption value={-1}>포트폴리오 선택</PlaceHolderOption>
			{(portfolios ?? []).map(({ id, name }) => (
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
