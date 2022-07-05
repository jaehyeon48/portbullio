import { SyntheticEvent } from 'react';
import { useToast } from 'super-simple-react-toast';
import { PortfolioPrivacy, Portfolio } from '@prisma/client';
import * as Icon from '@components/Icons';
import ListItems from '@components/ListPage/ListItems';
import { EmptyListNotice, ListItem } from '@components/ListPage/styles';
import { useModal } from '@hooks/Modal';
import useDefaultPortfolioId from '@hooks/ReactQuery/useDefaultPortfolioId';
import SetDefaultButton from './SetDefaultButton';
import * as Style from './styles';
import DeleteConfirm from '../ModalPage/DeleteConfirm';
import EditPortfolioName from '../ModalPage/EditPortfolioName';
import useEditPortfolioPrivacy from '../queries/useEditPortfolioPrivacy';

interface Props {
	portfolioList: Portfolio[] | undefined;
	isLoading: boolean;
}

export default function PortfolioList({ portfolioList, isLoading }: Props) {
	const toast = useToast();
	const { openModal, closeModal } = useModal();
	const defaultPortfolioId = useDefaultPortfolioId();
	const editPortfolioPrivacyMutation = useEditPortfolioPrivacy();

	function openEditPortfolioModal(e: SyntheticEvent, portfolioId: number, prevName: string) {
		openModal(e, <EditPortfolioName portfolioId={portfolioId} prevName={prevName} />);
	}

	function openDeleteConfirmModal(
		e: SyntheticEvent,
		portfolioId: number,
		portfolioName: string,
		isDefaultPortfolio: boolean
	) {
		openModal(
			e,
			<DeleteConfirm
				portfolioId={portfolioId}
				portfolioName={portfolioName}
				isDefaultPortfolio={isDefaultPortfolio}
			/>
		);
	}

	async function handleTogglePrivacy(
		e: SyntheticEvent,
		portfolioId: number,
		portfolioName: string,
		prevPrivacy: PortfolioPrivacy
	) {
		const newPrivacy = prevPrivacy === 'public' ? 'private' : 'public';
		editPortfolioPrivacyMutation.mutate(
			{ portfolioId, newPrivacy },
			{
				onSuccess: () => {
					toast.success({
						message: `${portfolioName}을(를) ${privacyKor[newPrivacy]}로 전환했습니다.`
					});
					closeModal(e, false);
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' })
			}
		);
	}

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<ListItems
			isListEmpty={!portfolioList || portfolioList.length === 0}
			emptyListNoticeMessage="포트폴리오가 없습니다."
		>
			{portfolioList?.map(({ id, name, privacy }) => (
				<ListItem key={id}>
					<Style.PortfolioNameSection>{name}</Style.PortfolioNameSection>
					<Style.PortfolioPrivacySection>
						{privacy === 'public' ? <Icon.LockOpen /> : <Icon.LockClose />}
						{privacyKor[privacy as keyof typeof PortfolioPrivacy]}
						<Style.TogglePrivacyButton
							type="button"
							onClick={e => handleTogglePrivacy(e, id, name, privacy)}
						>
							변경
						</Style.TogglePrivacyButton>
					</Style.PortfolioPrivacySection>
					<Style.PortfolioActionSection>
						<SetDefaultButton
							defaultPortfolioId={defaultPortfolioId.data}
							portfolioId={id}
							portfolioName={name}
							isLoading={defaultPortfolioId.isLoading}
							isError={defaultPortfolioId.isError}
							refetch={defaultPortfolioId.refetch}
						/>
						<Style.PortfolioActionButtons>
							<Style.EditNameButton
								type="button"
								onClick={e => openEditPortfolioModal(e, id, name)}
							>
								<Icon.Pencil width={16} height={16} />
								이름 수정
							</Style.EditNameButton>
							<Style.DeletePortfolioButton
								type="button"
								onClick={e => openDeleteConfirmModal(e, id, name, id === defaultPortfolioId.data)}
							>
								<Icon.TrashCan width={16} height={16} />
								삭제
							</Style.DeletePortfolioButton>
						</Style.PortfolioActionButtons>
					</Style.PortfolioActionSection>
				</ListItem>
			))}
		</ListItems>
	);
}

const privacyKor = {
	public: '공개',
	private: '비공개'
} as const;
