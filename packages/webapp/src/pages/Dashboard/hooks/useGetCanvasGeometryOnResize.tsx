import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { debounce } from '@utils';

interface UseGetCanvasGeometryOnResizeProps {
	canvasRef: RefObject<HTMLCanvasElement>;
	setStateFn: Dispatch<
		SetStateAction<{
			width: number | undefined;
			height: number | undefined;
		}>
	>;
	limit?: number;
}
export default function useGetCanvasGeometryOnResize({
	canvasRef,
	setStateFn,
	limit = 100
}: UseGetCanvasGeometryOnResizeProps) {
	useEffect(() => {
		const getCanvasGeometry = debounce(() => {
			setStateFn({
				width: canvasRef.current?.clientWidth ?? 0,
				height: canvasRef.current?.clientHeight ?? 0
			});
		}, limit);

		window.addEventListener('resize', getCanvasGeometry);

		return () => {
			window.removeEventListener('resize', getCanvasGeometry);
		};
	}, [canvasRef, setStateFn, limit]);
}
