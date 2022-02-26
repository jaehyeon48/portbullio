import { SyntheticEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { MAX_PORTFOLIO_NAME_LENGTH } from '@portbullio/shared/src/constants';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import { TextInput } from '@components/Form';
import { LockClose, LockOpen } from '@components/Icon';
import toast from '@lib/toast';
import { createPortfolio } from '@api/portfolio';
import { CloseModalFn } from '@types';
import * as Style from './styles';

interface Props {
	closeModal: CloseModalFn;
}

export default function AddPortfolio({ closeModal }: Props) {
	const queryClient = useQueryClient();
	const [newName, setNewName] = useState('');
	const [privacy, setPrivacy] = useState<PortfolioPrivacy>('public');

	function handleChangeNewName(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setNewName(target.value);
	}

	function isInvalidName() {
		return newName.length > MAX_PORTFOLIO_NAME_LENGTH;
	}

	function handleChangePrivacy(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setPrivacy(target.value as PortfolioPrivacy);
	}

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (newName === '') {
			toast.error('포트폴리오 이름을 작성해주세요.', 'light', 'topRight');
			return;
		}

		if (isInvalidName()) {
			toast.error('포트폴리오 이름은 20자 이하이어야 합니다.', 'light', 'topRight');
			return;
		}

		const createRes = await createPortfolio(newName, privacy);
		if (!createRes) {
			toast.error('에러가 발생했습니다. 다시 시도해 주세요', 'light', 'topRight');
			return;
		}
		toast.success('성공적으로 포트폴리오를 추가했습니다.', 'light', 'topRight');
		queryClient.invalidateQueries('portfolioList');
		closeModal(e, false);
	}

	return (
		<Style.Container>
			<Style.Header>포트폴리오 추가</Style.Header>
			<Style.Form onSubmit={handleSubmit}>
				<TextInput
					htmlFor="new-portfolio-name"
					labelName="새 포트폴리오 이름"
					placeholder="새 포트폴리오 이름"
					value={newName}
					handleChange={handleChangeNewName}
					errorLabel="이름은 20자 이하여야 합니다."
					isError={isInvalidName}
				/>
				<Style.RadioInputContainer>
					<Style.RadioInput
						id="privacy-public"
						type="radio"
						name="portfolioPrivacy"
						value="public"
						checked={privacy === 'public'}
						onChange={handleChangePrivacy}
					/>
					<Style.RadioLabel htmlFor="privacy-public">
						<LockOpen />
						공개
					</Style.RadioLabel>
					<Style.RadioInput
						id="privacy-private"
						type="radio"
						name="portfolioPrivacy"
						value="private"
						checked={privacy === 'private'}
						onChange={handleChangePrivacy}
					/>
					<Style.RadioLabel htmlFor="privacy-private">
						<LockClose />
						비공개
					</Style.RadioLabel>
				</Style.RadioInputContainer>
				<Style.AddButton type="submit">추가하기</Style.AddButton>
			</Style.Form>
		</Style.Container>
	);
}
