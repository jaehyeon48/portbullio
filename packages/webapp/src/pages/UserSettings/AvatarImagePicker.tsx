import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AddImage as AddImageIcon, AvatarImage } from '@components/index';
import { uploadAvatar } from '@api/user';
import { useThemeMode } from '@hooks/index';
import { AVATAR_MIME_TYPES } from '@portbullio/shared/src/constants/index';
import toast from '@lib/toast';
import * as Style from './styles';

export default function AvatarImagePicker() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();
	const [themeMode] = useThemeMode();
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [newAvatarImage, setNewAvatarImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isValidMIMEType, setIsValidMIMEType] = useState(true);

	useEffect(() => {
		if (!newAvatarImage) return;
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result as string);
		};
		fileReader.readAsDataURL(newAvatarImage);
	}, [newAvatarImage]);

	function openFilePicker() {
		if (!fileInputRef.current) return;
		fileInputRef.current.click();
	}

	function cancelUpload() {
		setPreviewUrl(null);
		setNewAvatarImage(null);
	}

	function handlePickedImage(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length !== 1) {
			setPreviewUrl(null);
			return;
		}

		setIsValidMIMEType(true);
		const [pickedImage] = target.files;
		if (!(pickedImage.type in AVATAR_MIME_TYPES)) {
			setIsValidMIMEType(false);
		}
		setNewAvatarImage(pickedImage);
	}

	async function handleUploadAvatar() {
		if (!newAvatarImage) {
			toast.error('새 아바타 이미지가 없습니다.', themeMode, 'topRight');
			return;
		}

		setIsUploadingImage(true);
		setNewAvatarImage(null);
		setPreviewUrl(null);
		setIsValidMIMEType(true);
		const uploadResponse = await uploadAvatar(newAvatarImage);
		if (uploadResponse === '') {
			toast.error(
				'아바타 이미지 업데이트에 실패했습니다. 다시 시도해 주세요.',
				themeMode,
				'topRight'
			);
			setIsUploadingImage(false);
			return;
		}

		toast.success('아바타 이미지가 업데이트 되었습니다.', themeMode, 'topRight');
		queryClient.setQueryData('avatarUrl', uploadResponse);
		setIsUploadingImage(false);
	}

	function renderImage() {
		if (isUploadingImage) return <div>업로딩 중...</div>;
		if (previewUrl) return <Style.Image src={previewUrl} alt="New avatar preview" />;
		return <AvatarImage userIconWidth={60} userIconHeight={60} />;
	}

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				accept=".jpg,.jpeg,.png,.webp"
				onChange={handlePickedImage}
			/>
			<Style.ImageContainer aria-label="User profile image" onClick={openFilePicker}>
				{renderImage()}
				<Style.AddImageIconContainer>
					<AddImageIcon width={22} height={22} />
				</Style.AddImageIconContainer>
			</Style.ImageContainer>
			{!isValidMIMEType && (
				<Style.NoticeNotSupportedImageType>
					지원하지 않는 이미지 형식입니다.
				</Style.NoticeNotSupportedImageType>
			)}
			{isValidMIMEType && newAvatarImage && (
				<Style.UploadButtonContainer>
					<Style.ImageUploadButton type="button" onClick={cancelUpload}>
						취소
					</Style.ImageUploadButton>
					<Style.ImageUploadButton type="button" onClick={handleUploadAvatar} bgPrimary="primary">
						이미지 수정
					</Style.ImageUploadButton>
				</Style.UploadButtonContainer>
			)}
		</>
	);
}
