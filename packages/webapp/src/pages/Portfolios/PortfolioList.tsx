import { useRef } from 'react';
import * as Icon from '@components/Icon';
import { useCustomScrollBar } from '@hooks/ScrollBar';
import * as Style from './styles';

interface Portfolio {
	id: number;
	isSelected: boolean;
	name: string;
	privacy: 'public' | 'private';
}

interface Props {
	portfolioList: Portfolio[];
}

export default function PortfolioList({ portfolioList }: Props) {
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScrollBar({
		innerContainerRef,
		outerContainerRef,
		outerContainerBorderWidth: 1
	});
	return (
		<Style.PortfolioListItems ref={outerContainerRef} onScroll={calculateThumbY}>
			<ScrollBarThumb ref={thumbRef} height={thumbH} />
			<div ref={innerContainerRef}>
				{portfolioList.map(({ id, name, privacy }, idx) => (
					<Style.PortfolioListItem key={id} isFirstList={idx === 0}>
						<Style.PortfolioIsSelectedSection>
							<Icon.CircleCheck />
						</Style.PortfolioIsSelectedSection>
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
				))}
			</div>
		</Style.PortfolioListItems>
	);
}

const privacyKor = {
	public: '공개',
	private: '비공개'
};
