import * as React from 'react';
import { io } from 'socket.io-client';
import envConfig from '@configs/env';

interface ProviderProps {
	children: React.ReactNode;
}

const socket = io(envConfig.socketServerUrl as string);
const SocketIoContext = React.createContext(socket);

export function SocketIoContextProvider({ children }: ProviderProps) {
	return <SocketIoContext.Provider value={socket}>{children}</SocketIoContext.Provider>;
}

export function useSocketIo() {
	const state = React.useContext(SocketIoContext);
	if (state === null) throw new Error('Cannot find HoldingsTickersProvider');
	return state;
}
