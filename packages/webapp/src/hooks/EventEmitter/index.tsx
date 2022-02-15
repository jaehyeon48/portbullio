import * as React from 'react';
import EventEmitter from 'eventemitter3';

const EventEmitterContext = React.createContext<EventEmitter<string | symbol, any> | null>(null);
const Emitter = new EventEmitter();

export function EventEmitterProvider({ children }: { children: React.ReactNode }) {
	return <EventEmitterContext.Provider value={Emitter}>{children}</EventEmitterContext.Provider>;
}

export function useEmitter() {
	const state = React.useContext(EventEmitterContext);
	if (state === null) throw new Error('Cannot find EventEmitterContextProvider');
	return state;
}
