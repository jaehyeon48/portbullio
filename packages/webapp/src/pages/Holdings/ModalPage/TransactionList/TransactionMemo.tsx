import { SyntheticEvent, useState } from 'react';
import { Textarea } from '@components/Form';
import toast from '@lib/toast';
import * as Style from './styles';
import { useEditStockTransactionMemo } from '../../queries';

interface Props {
	portfolioId: number;
	ticker: string;
	stockTransactionId: number;
	memoContent: string;
	closeMemoInput: () => void;
}

export default function TransactionMemo({
	portfolioId,
	ticker,
	stockTransactionId,
	memoContent,
	closeMemoInput
}: Props) {
	const [memo, setMemo] = useState(memoContent);
	const editMemoMutation = useEditStockTransactionMemo(portfolioId, ticker);

	if (stockTransactionId < 1) return null;

	function handleMemo(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setMemo(target.value);
	}

	function handleUpdateMemo(e: SyntheticEvent) {
		e.preventDefault();
		editMemoMutation.mutate(
			{ stockTransactionId, newMemo: memo },
			{
				onSuccess: () => {
					toast.success({ message: '메모 내용을 변경했습니다.' });
					closeMemoInput();
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요.' })
			}
		);
	}

	return (
		<Style.Form onSubmit={handleUpdateMemo}>
			<Textarea
				labelName="메모 내용"
				htmlFor="memo-content"
				value={memo}
				handleChange={handleMemo}
				rows={3}
				cols={60}
			/>
			<Style.MemoSubmitButtonContainer>
				<Style.MemoSubmitCancelButton type="button" onClick={closeMemoInput}>
					취소
				</Style.MemoSubmitCancelButton>
				<Style.MemoSubmitButton type="submit">메모 수정</Style.MemoSubmitButton>
			</Style.MemoSubmitButtonContainer>
		</Style.Form>
	);
}
