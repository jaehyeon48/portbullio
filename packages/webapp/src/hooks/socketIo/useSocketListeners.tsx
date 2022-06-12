import { useEffect } from 'react';
import { useRealtimeDataUpdate } from '@hooks/realtimeData';
import { useSocketIo } from './index';

export default function useSocketListeners() {
	const socket = useSocketIo();
	const setRealtimeData = useRealtimeDataUpdate();

	useEffect(() => {
		let shouldCancel = false;
		socket.on('connect', () => {});
		socket.on('REALTIME_DATA', data => {
			if (shouldCancel) return;
			setRealtimeData(data);
		});
		socket.on('CACHED_DATA', data => {
			if (shouldCancel) return;
			setRealtimeData(prev => ({ ...prev, ...data }));
		});

		return () => {
			shouldCancel = true;
		};
	}, [socket, setRealtimeData]);
}
