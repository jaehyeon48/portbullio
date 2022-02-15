import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AddImage as AddImageIcon, AvatarImage } from '@components/index';
import { uploadAvatar } from '@api/user';
import { useThemeMode } from '@hooks/index';
import toast from '@lib/toast';
import * as Style from './styles';

export default function AvatarImagePicker() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();
	const [themeMode] = useThemeMode();
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [newAvatarImage, setNewAvatarImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

	function handlePickedImage(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length !== 1) {
			setPreviewUrl('');
			return;
		}

		const [pickedImage] = target.files;
		setNewAvatarImage(pickedImage);
	}

	async function handleUploadAvatar() {
		if (!newAvatarImage) {
			toast.error('새 아바타 이미지가 없습니다.', themeMode, 'topRight');
			return;
		}

		setIsUploadingImage(true);
		setNewAvatarImage(null);
		setPreviewUrl('');

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
			{newAvatarImage && (
				<Style.Button type="button" onClick={handleUploadAvatar}>
					이미지 수정
				</Style.Button>
			)}
		</>
	);
}
