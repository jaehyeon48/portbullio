import styled, { keyframes } from 'styled-components';

export default function SuspenseFallbackSpinner() {
	return (
		<LoadingSpinnerContainer>
			<Spinner />
			<LoadingMessage>로딩 중...</LoadingMessage>
		</LoadingSpinnerContainer>
	);
}

const LoadingSpinnerContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LoadingMessage = styled.p`
	margin: 6px 0 0 16px;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
}
`;

const Spinner = styled.div`
	display: inline-block;
	width: 60px;
	height: 60px;

	&:after {
		content: ' ';
		display: block;
		width: 50px;
		height: 50px;
		margin: 8px;
		border-radius: 50%;
		border: 3px solid var(--primary);
		border-color: var(--primary) transparent var(--primary) transparent;
		animation: ${rotateAnimation} 1s linear infinite;
	}
`;
