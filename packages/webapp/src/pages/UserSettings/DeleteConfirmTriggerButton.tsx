import { useState } from 'react';
import * as Style from './styles';

interface Props {
	isButtonDisabled: boolean;
	onDelete: any;
}

export default function DeleteConfirmTriggerButton({ isButtonDisabled, onDelete }: Props) {
	const [isOpenImageDeleteConfirm, setIsOpenImageDeleteConfirm] = useState(false);

	function openDeleteImageConfirm() {
		setIsOpenImageDeleteConfirm(true);
	}

	function closeDeleteImageConfirm() {
		setIsOpenImageDeleteConfirm(false);
	}

	async function handleOnDelete() {
		await onDelete();
		closeDeleteImageConfirm();
	}

	return (
		<>
			<Style.ImageDeleteButton
				type="button"
				disabled={isButtonDisabled}
				onClick={openDeleteImageConfirm}
			>
				이미지 삭제
			</Style.ImageDeleteButton>
			{isOpenImageDeleteConfirm && (
				<Style.DeleteConfirmContainer>
					<Style.DeleteConfirmMessage>정말 이미지를 삭제하시겠습니까?</Style.DeleteConfirmMessage>
					<div>
						<Style.DeleteConfirmCancelButton type="button" onClick={closeDeleteImageConfirm}>
							취소
						</Style.DeleteConfirmCancelButton>
						<Style.DeleteConfirmButton type="button" onClick={handleOnDelete}>
							삭제
						</Style.DeleteConfirmButton>
					</div>
				</Style.DeleteConfirmContainer>
			)}
		</>
	);
}
