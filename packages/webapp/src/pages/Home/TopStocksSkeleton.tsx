import styled from 'styled-components';
import * as Style from './styles';

export default function TopStocksSkeleton() {
	return (
		<>
			{[0, 1, 2, 3, 4].map(key => (
				<Style.TopStocksListItem key={key} as="li">
					<SkeletonWrapper>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</SkeletonWrapper>
				</Style.TopStocksListItem>
			))}
		</>
	);
}

const SkeletonWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const Skeleton = styled.div`
	width: 25%;
	height: 20px;
	margin: 0 auto;
	border-radius: 4px;
	background: var(--skeleton-gradient);
	background-size: 300%;
	animation: skeleton-loading 1.5s ease infinite;

	@keyframes skeleton-loading {
		0% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0 50%;
		}
	}
`;
