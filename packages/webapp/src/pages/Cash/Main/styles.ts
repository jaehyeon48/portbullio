import styled from 'styled-components';
import { buttonMixin } from '@styles/Mixins';
import { listActionButtonStyle } from '@components/ListPage';

export const DateSection = styled.div`
	min-width: 120px;
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
	${buttonMixin}
	padding: 0;

	& > svg {
		fill: var(--baseTextColor);
	}
`;

export const NoteSection = styled.div`
	min-width: 210px;
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
