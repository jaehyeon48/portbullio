import { ReactNode, useEffect } from 'react';
import { useAuthUpdate } from '@hooks/Auth';
import { useEmitter } from '@hooks/EventEmitter';

interface Props {
	children: ReactNode;
}

export default function EventEmitterListeners({ children }: Props) {
	const setAuth = useAuthUpdate();
	const Emitter = useEmitter();

	useEffect(() => {
		function handleSetAuthToFalse() {
			setAuth(false);
		}
		Emitter.on('LOG_OUT', handleSetAuthToFalse);

		return () => {
			Emitter.removeListener('LOG_OUT', handleSetAuthToFalse);
		};
	}, [Emitter, setAuth]);

	return <>{children}</>;
}
