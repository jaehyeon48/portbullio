import { useEffect } from 'react';
import { useToast } from 'super-simple-react-toast';
import { checkAuth } from '@api/auth';
import { useAuthUpdate } from '@hooks/index';

interface Props {
	routePath: string;
	requireLoginMessage?: boolean;
}

const THROTTLE_LIMIT = 1000 * 60 * 10;
let lastCalledTime = 0;

export default function useCheckSession({ routePath, requireLoginMessage = false }: Props) {
	const toast = useToast();
	const setAuth = useAuthUpdate();

	useEffect(() => {
		async function tryLogIn() {
			const now = Date.now();
			if (now - lastCalledTime < THROTTLE_LIMIT) return;
			const { userId, isInitialLogin } = await checkAuth();

			setAuth(!!userId);
			lastCalledTime = now;
			if (requireLoginMessage && !userId) {
				toast.error({ message: '세션이 만료되었습니다. 다시 로그인해주세요.' });
			}
			if (isInitialLogin) {
				toast.success({ message: '성공적으로 로그인 되었습니다.' });
			}
		}

		tryLogIn();
	}, [toast, setAuth, requireLoginMessage, routePath]);
}
