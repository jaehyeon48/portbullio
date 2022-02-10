import { useRef, useState, useEffect, MutableRefObject } from 'react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { scrollBarMixin } from '@src/styles/Mixins';
import { ScrollBarThumbProps } from '@types';

const MIN_THUMB_H = 60;

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

interface CalculateRevisedThumbProps {
	outerTop: number;
	innerTop: number;
	outerH: number;
	innerH: number;
	thumbH: number;
	outerContainerBorderWidth?: number;
	isRevisedToMinH?: boolean;
}

const ScrollBarThumb = styled.div`
	${scrollBarMixin};
	background-color: ${({ theme }) => theme.scrollBar.normal.backgroundColor};
`;

function calculateRevisedThumbH({
	outerTop,
	innerTop,
	outerH,
	innerH,
	thumbH,
	outerContainerBorderWidth = 1,
	isRevisedToMinH = false
}: CalculateRevisedThumbProps) {
	const maxThumbScrollY = innerH - thumbH;
	const innerContainerY = outerTop - innerTop;
	const scrollYFactor = (innerH - thumbH) / (innerH - outerH);
	const minHFactor = isRevisedToMinH
		? (maxThumbScrollY - (MIN_THUMB_H - thumbH)) / maxThumbScrollY
		: 1;
	const thumbScrollYTmp = innerContainerY * scrollYFactor * minHFactor;
	const revisedMaxThumbScrollY = maxThumbScrollY - (isRevisedToMinH ? MIN_THUMB_H - thumbH : 0);
	const thumbScrollY =
		thumbScrollYTmp < outerContainerBorderWidth ? outerContainerBorderWidth : thumbScrollYTmp;
	return thumbScrollY > revisedMaxThumbScrollY ? revisedMaxThumbScrollY : thumbScrollY;
}

export default function useCustomScrollBar({
	outerContainerRef,
	innerContainerRef,
	outerContainerBorderWidth
}: Props): ReturnType {
	const thumbRef = useRef<HTMLDivElement | null>(null);
	const originalThumbH = useRef(-1);
	const [thumbH, setThumbHeight] = useState(0);

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		function initThumbHeight() {
			if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) return;
			const { clientHeight: outerH } = outerContainerRef.current;
			const { clientHeight: innerH } = innerContainerRef.current;
			if (innerH <= outerH) return;

			const thumbHCandidate = outerH ** 2 / innerH;
			if (thumbHCandidate < MIN_THUMB_H) originalThumbH.current = thumbHCandidate;
			setThumbHeight(thumbHCandidate < MIN_THUMB_H ? MIN_THUMB_H : thumbHCandidate);
			clearInterval(intervalId);
		}

		if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) {
			intervalId = setInterval(initThumbHeight, 1);
		} else initThumbHeight();
	}, [outerContainerRef, innerContainerRef, thumbRef, outerContainerBorderWidth]);

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		function initThumbY() {
			if (!thumbRef.current) return;
			if (!outerContainerRef.current) return;
			if (!innerContainerRef.current) return;

			const { clientHeight: outerH } = outerContainerRef.current;
			const { clientHeight: innerH } = innerContainerRef.current;
			const { top: outerTop } = outerContainerRef.current.getBoundingClientRect();
			const { top: innerTop } = innerContainerRef.current.getBoundingClientRect();

			const revisedThumbScrollY =
				originalThumbH.current === -1
					? calculateRevisedThumbH({ outerTop, innerTop, outerH, innerH, thumbH })
					: calculateRevisedThumbH({
							outerTop,
							innerTop,
							outerH,
							innerH,
							thumbH: originalThumbH.current,
							isRevisedToMinH: true
					  });
			thumbRef.current.style.transform = `translateY(${revisedThumbScrollY}px)`;
			clearInterval(intervalId);
		}

		if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) {
			intervalId = setInterval(initThumbY, 1);
		} else initThumbY();
	}, [thumbH, innerContainerRef, outerContainerRef]);

	function calculateThumbY() {
		if (!thumbRef.current) return;
		if (!outerContainerRef.current) return;
		if (!innerContainerRef.current) return;

		const { clientHeight: outerH } = outerContainerRef.current;
		const { clientHeight: innerH } = innerContainerRef.current;
		const { top: outerTop } = outerContainerRef.current.getBoundingClientRect();
		const { top: innerTop } = innerContainerRef.current.getBoundingClientRect();

		const revisedThumbScrollY =
			originalThumbH.current === -1
				? calculateRevisedThumbH({ outerTop, innerTop, outerH, innerH, thumbH })
				: calculateRevisedThumbH({
						outerTop,
						innerTop,
						outerH,
						innerH,
						thumbH: originalThumbH.current,
						isRevisedToMinH: true
				  });
		thumbRef.current.style.transform = `translateY(${revisedThumbScrollY}px)`;
	}

	return {
		calculateThumbY,
		ScrollBarThumb,
		thumbH,
		thumbRef
	};
}
