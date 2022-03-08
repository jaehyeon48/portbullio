import { SyntheticEvent } from 'react';
import { PortfolioPrivacy, Portfolio } from '@prisma/client';
import * as Icon from '@components/Icon';
import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import { useModal } from '@hooks/index';

import { formatCurrency } from '@utils';
import toast from '@lib/toast';
import * as Style from './styles';
import EditPortfolioName from '../ModalPage/EditPortfolioName';
import DeleteConfirm from '../ModalPage/DeleteConfirm';
import { useEditPortfolioPrivacy, useEditDefaultPortfolio } from '../queries/index';

interface Props {
	portfolioList: Portfolio[] | undefined;
	isLoading: boolean;
	defaultPortfolioId: number | undefined;
}

export default function PortfolioList({ portfolioList, isLoading, defaultPortfolioId }: Props) {
	const { openModal, closeModal } = useModal();
	const editPortfolioPrivacyMutation = useEditPortfolioPrivacy();
	const editDefaultPortfolioMutation = useEditDefaultPortfolio();

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

	async function handleEditDefaultPortfolio(newPortfolioId: number, portfolioName: string) {
		if (newPortfolioId === defaultPortfolioId) return;
		if (defaultPortfolioId === undefined) {
			toast.error({ message: '기본으로 설정된 포트폴리오가 없습니다.' });
			return;
		}

		editDefaultPortfolioMutation.mutate(
			{
				prevPortfolioId: defaultPortfolioId,
				newPortfolioId
			},
			{
				onSuccess: () =>
					toast.success({ message: `${portfolioName}을(를) 기본 포트폴리오로 설정했습니다.` }),
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
			{(portfolioList ?? []).map(({ id, name, privacy }, idx) => (
				<ListItem key={id} isFirstList={idx === 0}>
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
					<Style.PortfolioAssetSection>{formatCurrency(123456, 'usd')}</Style.PortfolioAssetSection>
					<Style.PortfolioActionSection>
						<Style.SetDefaultButton
							type="button"
							isDefault={id === defaultPortfolioId}
							onClick={() => handleEditDefaultPortfolio(id, name)}
						>
							<Icon.CircleCheck width={20} height={20} />
							{id === defaultPortfolioId ? '기본 포트폴리오' : '기본으로 설정'}
						</Style.SetDefaultButton>
						<Style.EditNameButton type="button" onClick={e => openEditPortfolioModal(e, id, name)}>
							<Icon.Pencil width={16} height={16} />
							이름 수정
						</Style.EditNameButton>
						<Style.DeletePortfolioButton
							type="button"
							onClick={e => openDeleteConfirmModal(e, id, name, id === defaultPortfolioId)}
						>
							<Icon.TrashCan width={16} height={16} />
							삭제
						</Style.DeletePortfolioButton>
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
