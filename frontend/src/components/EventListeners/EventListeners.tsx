import { ReactNode, useLayoutEffect } from 'react';
import { LOG_OUT } from '@constants';
import { useEmitter } from '@hooks/EventEmitter';
import { useAuthUpdate } from '@hooks/Auth';

interface Props {
	children: ReactNode;
}

export default function EventListeners({ children }: Props) {
	const setAuth = useAuthUpdate();
	const Emitter = useEmitter();

	useLayoutEffect(() => {
		function handleSetAuthToFalse() {
			setAuth(false);
		}
		Emitter.on(LOG_OUT, handleSetAuthToFalse);

		return () => {
			Emitter.removeListener(LOG_OUT, handleSetAuthToFalse);
		};
	}, [Emitter, setAuth]);

	return <>{children}</>;
}
