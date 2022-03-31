import { useEffect } from 'react';
import { useSocketIo } from './useSocketIo';

export default function useSocketListeners() {
	const socket = useSocketIo();

	useEffect(() => {
		socket.on('connect', () => {});
	}, [socket]);
}
