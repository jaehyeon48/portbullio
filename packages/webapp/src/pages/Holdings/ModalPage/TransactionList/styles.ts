import styled from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

export const Header = styled.h1`
	font-size: 24px;
	margin-bottom: 30px;
	text-align: center;
`;

export const DateSection = styled.div`
	min-width: 130px;
`;

export const TransactionTypeSection = styled.div`
	min-width: 80px;
`;

export const PriceSection = styled.div`
	min-width: 130px;
`;

export const QuantitySection = styled.div`
	min-width: 100px;
`;

export const MemoSection = styled.div`
	min-width: 70px;
`;

export const MemoOpenButton = styled.button`
	${buttonMixin}
`;

export const Form = styled.form`
	padding: 10px 3px;
`;

export const MemoSubmitButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 3px 0 0 auto;
`;

export const MemoSubmitCancelButton = styled.button`
	${buttonMixin};
	background-color: var(--gray);
	color: var(--white);
	border-radius: 4px;
	padding: 0.3em 0.8em;
	margin-right: 4px;
`;

export const MemoSubmitButton = styled.button`
	${buttonMixin};
	background-color: var(--deepOrange);
	color: var(--white);
	border-radius: 4px;
	padding: 0.3em 0.6em;
`;
