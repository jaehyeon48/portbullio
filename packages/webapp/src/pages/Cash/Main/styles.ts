import styled from 'styled-components';
import { memoButtonMixin } from '@styles/Mixins';
import { listActionButtonStyle } from '@components/ListPage';

export const DateSection = styled.div`
	min-width: 150px;
`;

export const CashTypeSection = styled.div`
	min-width: 110px;
`;

export const AmountSection = styled.div`
	min-width: 200px;
`;

export const MemoSection = styled.div`
	min-width: 90px;
`;

export const MemoOpenButton = styled.button`
	${memoButtonMixin};
`;

export const ActionsSection = styled.div`
	display: flex;
	min-width: 300px;
`;

export const CashTransactionEditButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepOrange);
	margin-right: 14px;
`;

export const CashTransactionDeleteButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepRed);
`;
