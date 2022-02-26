import { SyntheticEvent, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import * as Icon from '@components/Icon';
import { editPortfolioPrivacy } from '@api/portfolio';
import { useCustomScrollBar, useModal } from '@hooks/index';
import { Portfolio } from '@types';
import toast from '@lib/toast';
import * as Style from './styles';
import EditPortfolio from '../ModalPage/EditPortfolio';
import DeleteConfirm from '../ModalPage/DeleteConfirm';

interface Props {
	portfolioList: Portfolio[] | undefined;
	isLoading: boolean;
}

export default function PortfolioList({ portfolioList, isLoading }: Props) {
	const queryClient = useQueryClient();
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScrollBar({
		innerContainerRef,
		outerContainerRef,
		outerContainerBorderWidth: 1
	});
	const { openModal, closeModal } = useModal();

	useEffect(() => {
		calculateThumbY();
	}, [calculateThumbY]);

	function openEditPortfolioModal(e: SyntheticEvent, portfolioId: number, prevName: string) {
		openModal(e, <EditPortfolio portfolioId={portfolioId} prevName={prevName} />);
	}

	function openDeleteConfirmModal(e: SyntheticEvent, portfolioId: number, portfolioName: string) {
		openModal(e, <DeleteConfirm portfolioId={portfolioId} portfolioName={portfolioName} />);
	}

	async function handleTogglePrivacy(
		e: SyntheticEvent,
		portfolioId: number,
		portfolioName: string,
		prevPrivacy: PortfolioPrivacy
	) {
		const newPrivacy = prevPrivacy === 'public' ? 'private' : 'public';
		const editRes = await editPortfolioPrivacy(portfolioId, newPrivacy);
		if (!editRes) {
			toast.error('에러가 발생했습니다. 다시 시도해 주세요', 'light', 'topRight');
			return;
		}
		toast.success(
			`${portfolioName}을(를) ${privacyKor[newPrivacy]}로 전환했습니다.`,
			'light',
			'topRight'
		);
		queryClient.invalidateQueries('portfolioList');
		closeModal(e, false);
	}

	if (isLoading) {
		return <Style.ListNotice>로딩 중...</Style.ListNotice>;
	}

	return (
		<Style.PortfolioListItems ref={outerContainerRef} onScroll={calculateThumbY}>
			<ScrollBarThumb ref={thumbRef} height={thumbH} />
			<div ref={innerContainerRef}>
				{!portfolioList || portfolioList.length === 0 ? (
					<Style.ListNotice>포트폴리오가 없습니다.</Style.ListNotice>
				) : (
					portfolioList.map(({ id, name, privacy }, idx) => (
						<Style.PortfolioListItem key={id} isFirstList={idx === 0}>
							<Style.PortfolioIsDefaultSection>
								<Icon.CircleCheck />
							</Style.PortfolioIsDefaultSection>
							<Style.PortfolioNameSection>{name}</Style.PortfolioNameSection>
							<Style.PortfolioPrivacySection>
								{privacy === 'public' ? <Icon.LockOpen /> : <Icon.LockClose />}
								{privacyKor[privacy]}
								<Style.TogglePrivacyButton
									type="button"
									onClick={e => handleTogglePrivacy(e, id, name, privacy)}
								>
									변경
								</Style.TogglePrivacyButton>
							</Style.PortfolioPrivacySection>
							<Style.PortfolioAssetSection>$123,456</Style.PortfolioAssetSection>
							<Style.PortfolioActionSection>
								<Style.EditNameButton
									type="button"
									onClick={e => openEditPortfolioModal(e, id, name)}
								>
									<Icon.Pencil width={16} height={16} />
									이름 수정
								</Style.EditNameButton>
								<Style.DeletePortfolioButton
									type="button"
									onClick={e => openDeleteConfirmModal(e, id, name)}
								>
									<Icon.TrashCan width={16} height={16} />
									삭제
								</Style.DeletePortfolioButton>
							</Style.PortfolioActionSection>
						</Style.PortfolioListItem>
					))
				)}
			</div>
		</Style.PortfolioListItems>
	);
}

const privacyKor = {
	public: '공개',
	private: '비공개'
};
