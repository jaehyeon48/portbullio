import { useEffect } from 'react';
import { useRealtimeDataUpdate } from '@hooks/index';
import { useSocketIo } from './useSocketIo';

export default function useSocketListeners() {
	const socket = useSocketIo();
	const setRealtimeData = useRealtimeDataUpdate();

	useEffect(() => {
		socket.on('connect', () => {});
		socket.on('REALTIME_DATA', data => setRealtimeData(data));
	}, [socket, setRealtimeData]);
}
