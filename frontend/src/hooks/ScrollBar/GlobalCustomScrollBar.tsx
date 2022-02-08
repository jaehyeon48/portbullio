import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { scrollBarMixin } from '@styles/mixins';

const GlobalScrollBarThumb = styled.div`
	${scrollBarMixin};
	background-color: ${({ theme }) => theme.scrollBar.global.backgroundColor};
`;

export default function GlobalCustomScrollBar() {
	const pageH = useRef(document.documentElement.offsetHeight);
	const { innerHeight: windowH } = window;
	const globalThumbRef = useRef<HTMLDivElement | null>(null);
	const [thumbH, setThumbHeight] = useState(0);

	useEffect(() => {
		pageH.current = document.documentElement.offsetHeight;
		if (windowH >= pageH.current) return;
		setThumbHeight(windowH ** 2 / pageH.current);
	}, [windowH]);

	useEffect(() => {
		function calculateThumbY() {
			if (!globalThumbRef.current) return;
			const { scrollY } = window;
			const scrollYFactor = (pageH.current - thumbH) / (pageH.current - windowH);
			const maxThumbScrollY = pageH.current - thumbH;
			const thumbScrollY = scrollY * scrollYFactor;
			const revisedThumbScrollY = thumbScrollY < 0 ? 0 : thumbScrollY;
			globalThumbRef.current.style.transform = `translateY(${
				revisedThumbScrollY > maxThumbScrollY ? maxThumbScrollY : revisedThumbScrollY
			}px)`;
		}
		document.addEventListener('scroll', calculateThumbY);

		return () => {
			document.removeEventListener('scroll', calculateThumbY);
		};
	}, [pageH, thumbH, windowH]);

	return createPortal(<GlobalScrollBarThumb height={thumbH} ref={globalThumbRef} />, document.body);
}
