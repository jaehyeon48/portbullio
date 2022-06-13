import { SyntheticEvent, useState } from 'react';
import { useToast } from 'super-simple-react-toast';
import Textarea from '@components/Form/Textarea';
import { CloseModalFn } from '@types';
import * as Style from './styles';
import useEditStockTransactionMemo from '../queries/useEditStockTransactionMemo';

interface Props {
	portfolioId: number;
	ticker: string;
	stockTransactionId: number;
	memo: string | null;
	closeFunction?: CloseModalFn;
}

export default function StockMemoEdit({
	portfolioId,
	ticker,
	stockTransactionId,
	closeFunction,
	memo
}: Props) {
	const toast = useToast();
	const [memoContent, setMemoContent] = useState(memo ?? '');
	const editMemoMutation = useEditStockTransactionMemo(portfolioId, ticker);

	function handleMemoContent(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setMemoContent(target.value);
	}

	function handleUpdateMemo(e: SyntheticEvent) {
		e.preventDefault();
		editMemoMutation.mutate(
			{ stockTransactionId, newMemo: memoContent ?? '' },
			{
				onSuccess: () => {
					toast.success({ message: '메모 내용을 변경했습니다.' });
					closeFunction!(e, false);
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
				value={memoContent}
				handleChange={handleMemoContent}
				rows={3}
				cols={60}
			/>
			<Style.MemoSubmitButtonContainer>
				<Style.MemoSubmitButton type="submit">메모 수정</Style.MemoSubmitButton>
			</Style.MemoSubmitButtonContainer>
		</Style.Form>
	);
}
