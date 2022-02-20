import { useRef } from 'react';
import * as Icon from '@components/Icon';
import { useCustomScrollBar } from '@hooks/ScrollBar';
import { Portfolio } from '@types';
import * as Style from './styles';

interface Props {
	portfolioList: Portfolio[] | undefined;
	isLoading: boolean;
}

export default function PortfolioList({ portfolioList, isLoading }: Props) {
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScrollBar({
		innerContainerRef,
		outerContainerRef,
		outerContainerBorderWidth: 1
	});

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
							</Style.PortfolioPrivacySection>
							<Style.PortfolioAssetSection>$123,456</Style.PortfolioAssetSection>
							<Style.PortfolioActionSection>
								<Style.EditNameButton type="button">
									<Icon.Pencil width={16} height={16} />
									이름 수정
								</Style.EditNameButton>
								<Style.DeletePortfolioButton type="button">
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
