import { useRef, useState, useEffect, MutableRefObject } from 'react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { scrollBarMixin } from '@styles/mixins';
import { ScrollBarThumbProps } from '@types';

interface Props {
	outerContainerRef: MutableRefObject<any>;
	innerContainerRef: MutableRefObject<any>;
	outerContainerBorderWidth: number;
}

interface ReturnType {
	calculateThumbY: () => void;
	ScrollBarThumb: StyledComponent<'div', DefaultTheme, ScrollBarThumbProps, never>;
	thumbH: number;
	thumbRef: MutableRefObject<HTMLDivElement | null>;
}

const ScrollBarThumb = styled.div`
	${scrollBarMixin};
	background-color: ${({ theme }) => theme.scrollBar.normal.backgroundColor};
`;

export default function useCustomScrollBar({
	outerContainerRef,
	innerContainerRef,
	outerContainerBorderWidth
}: Props): ReturnType {
	const thumbRef = useRef<HTMLDivElement | null>(null);
	const [thumbH, setThumbHeight] = useState(0);

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		function initThumbHeight() {
			if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) return;
			const { clientHeight: outerH } = outerContainerRef.current;
			const { clientHeight: innerH } = innerContainerRef.current;
			if (innerH <= outerH) return;
			setThumbHeight(outerH ** 2 / innerH);
			thumbRef.current.style.transform = `translateY(${outerContainerBorderWidth}px)`;
			clearInterval(intervalId);
		}

		if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) {
			intervalId = setInterval(initThumbHeight, 1);
		} else initThumbHeight();
	}, [outerContainerRef, innerContainerRef, thumbRef, outerContainerBorderWidth]);

	function calculateThumbY() {
		if (!thumbRef.current) return;
		if (!outerContainerRef.current) return;
		if (!innerContainerRef.current) return;

		const { clientHeight: outerH } = outerContainerRef.current;
		const { clientHeight: innerH } = innerContainerRef.current;
		const { top: outerTop } = outerContainerRef.current.getBoundingClientRect();
		const { top: innerTop } = innerContainerRef.current.getBoundingClientRect();
		const innerContainerY = outerTop - innerTop;
		const scrollYFactor = (innerH - thumbH) / (innerH - outerH);
		const maxThumbScrollY = innerH - thumbH;
		const thumbScrollY = innerContainerY * scrollYFactor;
		const revisedThumbScrollY =
			thumbScrollY < outerContainerBorderWidth ? outerContainerBorderWidth : thumbScrollY;
		thumbRef.current.style.transform = `translateY(${
			revisedThumbScrollY > maxThumbScrollY ? maxThumbScrollY : revisedThumbScrollY
		}px)`;
	}

	return {
		calculateThumbY,
		ScrollBarThumb,
		thumbH,
		thumbRef
	};
}
