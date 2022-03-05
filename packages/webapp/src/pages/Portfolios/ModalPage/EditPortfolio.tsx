import { SyntheticEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { MAX_PORTFOLIO_NAME_LENGTH } from '@portbullio/shared/src/constants';
import { editPortfolioName } from '@api/portfolio';
import { TextInput } from '@components/Form';
import toast from '@lib/toast';
import { CloseModalFn } from '@types';
import * as Style from './styles';

interface Props {
	prevName: string;
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function EditPortfolio({ prevName, portfolioId, closeFunction }: Props) {
	const queryClient = useQueryClient();
	const [newName, setNewName] = useState(prevName);

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (newName === '') {
			toast.error({ message: '포트폴리오 이름을 작성해주세요.' });
			return;
		}

		if (isInvalidName()) {
			toast.error({ message: '포트폴리오 이름은 20자 이하이어야 합니다.' });
			return;
		}

		const editRes = await editPortfolioName(portfolioId, newName);
		if (!editRes) {
			toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' });
			return;
		}
		toast.success({ message: '성공적으로 포트폴리오 이름을 변경했습니다.' });
		queryClient.invalidateQueries('portfolioList');
		closeFunction!(e, false);
	}

	function handleChangeNewName(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setNewName(target.value);
	}

	function isInvalidName() {
		return newName.length > MAX_PORTFOLIO_NAME_LENGTH;
	}

	return (
		<Style.Container>
			<Style.Header>포트폴리오 이름 수정</Style.Header>
			<Style.Form onSubmit={handleSubmit}>
				<TextInput
					htmlFor="edit-new-portfolio-name"
					labelName="새 포트폴리오 이름"
					placeholder="새 포트폴리오 이름"
					value={newName}
					handleChange={handleChangeNewName}
					errorLabel="이름은 20자 이하여야 합니다."
					isError={isInvalidName}
				/>
				<Style.AddButton type="submit">이름 변경</Style.AddButton>
			</Style.Form>
		</Style.Container>
	);
}
