import { ReactNode, useRef } from 'react';
import { useVerticalScrollBar } from '@hooks/index';
import { ListItemsContainer, EmptyListNotice } from './styles';

interface Props {
	isListEmpty: boolean;
	emptyListNoticeMessage: string;
	maxHeight?: string;
	children: ReactNode;
}

export default function ListItems({
	isListEmpty,
	emptyListNoticeMessage,
	maxHeight,
	children
}: Props) {
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { VerticalScrollBarThumb, calculateThumbY, verticalThumbH, verticalThumbRef } =
		useVerticalScrollBar({
			innerContainerRef,
			outerContainerRef,
			outerContainerBorderWidth: 1
		});

	return (
		<ListItemsContainer ref={outerContainerRef} onScroll={calculateThumbY} maxHeight={maxHeight}>
			<VerticalScrollBarThumb ref={verticalThumbRef} height={verticalThumbH} />
			<div ref={innerContainerRef}>
				{isListEmpty ? <EmptyListNotice>{emptyListNoticeMessage}</EmptyListNotice> : children}
			</div>
		</ListItemsContainer>
	);
}
