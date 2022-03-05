import { ImageUploadButton, ImageUploadCancelButton } from './styles';

interface Props {
	shouldRenderButtons: boolean;
	onCancel: any;
	onUpload: any;
}

export default function UploadButton({ shouldRenderButtons, onCancel, onUpload }: Props) {
	return (
		<>
			{shouldRenderButtons && (
				<div>
					<ImageUploadCancelButton type="button" onClick={onCancel}>
						취소
					</ImageUploadCancelButton>
					<ImageUploadButton type="button" onClick={onUpload}>
						이미지 수정
					</ImageUploadButton>
				</div>
			)}
		</>
	);
}
