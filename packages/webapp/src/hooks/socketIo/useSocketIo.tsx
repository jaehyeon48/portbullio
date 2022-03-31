import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { io, Socket } from 'socket.io-client';
import envConfig from '@configs/env';
import { ServerToClientEvents, ClientToServerEvents } from '@portbullio/shared/src/types';

interface ProviderProps {
	children: React.ReactNode;
}

const socketUserId = uuid();
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	envConfig.socketServerUrl as string,
	{ autoConnect: false }
);
socket.auth = { socketUserId };
socket.connect();
const SocketIoContext = React.createContext(socket);

export function SocketIoContextProvider({ children }: ProviderProps) {
	return <SocketIoContext.Provider value={socket}>{children}</SocketIoContext.Provider>;
}

export function useSocketIo() {
	const state = React.useContext(SocketIoContext);
	if (state === null) throw new Error('Cannot find HoldingsTickersProvider');
	return state;
}
