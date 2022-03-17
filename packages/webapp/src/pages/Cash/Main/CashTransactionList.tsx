import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import { CashTransactionLog, CashTransactionType } from '@prisma/client';
import { formatCurrency, formatDate } from '@utils';
import {
	StickyNote as StickyNoteIcon,
	TrashCan as TrashCanIcon,
	Pencil as PencilIcon
} from '@components/Icon';
import * as Style from './styles';

interface Props {
	cashList: CashTransactionLog[] | undefined;
	isLoading: boolean;
}

export default function CashTransactionList({ cashList, isLoading }: Props) {
	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<ListItems
			isListEmpty={!cashList || cashList.length === 0}
			emptyListNoticeMessage="현금 거래내역이 없습니다."
		>
			{cashList?.map(({ id, createdAt, transactionType, amount, note }) => (
				<ListItem key={id}>
					<Style.DateSection>{formatDate(createdAt as unknown as string)}</Style.DateSection>
					<Style.CashTypeSection>{translateCashTypeToKor(transactionType)}</Style.CashTypeSection>
					<Style.AmountSection>{formatCurrency(amount, 'usd')}</Style.AmountSection>
					<Style.MemoSection>
						<Style.MemoOpenButton type="button">
							<StickyNoteIcon />
						</Style.MemoOpenButton>
					</Style.MemoSection>
					<Style.NoteSection>{formatCashNote(note)}</Style.NoteSection>
					<Style.ActionsSection>
						<Style.CashTransactionEditButton type="button">
							<PencilIcon width={16} height={16} />
							내역 수정
						</Style.CashTransactionEditButton>
						<Style.CashTransactionDeleteButton type="button">
							<TrashCanIcon width={16} height={16} />
							삭제
						</Style.CashTransactionDeleteButton>
					</Style.ActionsSection>
				</ListItem>
			))}
		</ListItems>
	);
}

function formatCashNote(note: string | null) {
	if (note === null) return '';

	const [noteType, noteContent] = note.split(',');
	return `${noteContent} ${noteTypeStr(noteType)}`;
}

function noteTypeStr(noteType: string) {
	if (noteType === 's') return '매도';
	if (noteType === 'b') return '매수';
	return '배당';
}

function translateCashTypeToKor(type: CashTransactionType) {
	if (type === 'deposit') return '입금';
	if (type === 'withdraw') return '출금';
	if (type === 'purchased') return '매수';
	if (type === 'sold') return '매도';
	return '배당';
}
