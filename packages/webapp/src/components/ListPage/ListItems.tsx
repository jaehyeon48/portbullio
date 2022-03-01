import { ReactNode, useRef } from 'react';
import { useCustomScrollBar } from '@hooks/index';
import { ListItemsContainer, EmptyListNotice } from './styles';

interface Props {
	isListEmpty: boolean;
	emptyListNoticeMessage: string;
	children: ReactNode;
}

export default function ListItems({ isListEmpty, emptyListNoticeMessage, children }: Props) {
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScrollBar({
		innerContainerRef,
		outerContainerRef,
		outerContainerBorderWidth: 1
	});

	return (
		<ListItemsContainer ref={outerContainerRef} onScroll={calculateThumbY}>
			<ScrollBarThumb ref={thumbRef} height={thumbH} />
			<div ref={innerContainerRef}>
				{isListEmpty ? <EmptyListNotice>{emptyListNoticeMessage}</EmptyListNotice> : children}
			</div>
		</ListItemsContainer>
	);
}
