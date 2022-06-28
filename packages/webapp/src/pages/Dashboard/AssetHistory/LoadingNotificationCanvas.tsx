/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useRef, MouseEvent } from 'react';
import styled from 'styled-components';
import { assetHistoryChartLayout } from './styles';
import useGetCanvasGeometryOnResize from '../hooks/useGetCanvasGeometryOnResize';
import adjustToDpr from '../utils/adjustToDpr';

interface Props<T> {
	isLoadingData: boolean;
	onMouseDown: (e: MouseEvent<T>) => void;
	onPointerDown: (e: MouseEvent<T>) => void;
	onMouseUp: (e: MouseEvent<T>) => void;
	onPointerUp: (e: MouseEvent<T>) => void;
	onMouseMove: (e: MouseEvent<T>) => void;
	onPointerMove: (e: MouseEvent<T>) => void;
}

export default function LoadingNotificationCanvas({
	isLoadingData,
	...props
}: Props<HTMLCanvasElement>) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const renderTextTimeoutId = useRef<NodeJS.Timeout>();
	const [assetChartCanvasGeometry, setAssetChartCanvasGeometry] = useState({
		width: canvasRef.current?.clientWidth,
		height: canvasRef.current?.clientHeight
	});
	useGetCanvasGeometryOnResize({
		canvasRef,
		setStateFn: setAssetChartCanvasGeometry
	});

	useEffect(() => {
		if (!canvasRef.current) return;
		const loadingNotifiCationCanvas = canvasRef.current;
		const ctx = adjustToDpr(loadingNotifiCationCanvas.getContext('2d'), loadingNotifiCationCanvas);
		if (!ctx) return;

		const canvasWidth = assetChartCanvasGeometry.width ?? loadingNotifiCationCanvas.clientWidth;
		const canvasHeight = assetChartCanvasGeometry.height ?? loadingNotifiCationCanvas.clientHeight;
		ctx.font = 'bold 14px NotoSansKR';
		if (isLoadingData) {
			renderTextTimeoutId.current = setTimeout(() => {
				ctx.fillText('추가 데이터 로딩 중...', canvasWidth / 2, canvasHeight * 0.3);
			}, 100);
		} else {
			clearTimeout(renderTextTimeoutId.current as NodeJS.Timeout);
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		}
	}, [assetChartCanvasGeometry, isLoadingData]);

	return <Canvas ref={canvasRef} {...props} />;
}

export const Canvas = styled.canvas`
	${assetHistoryChartLayout};
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
`;
