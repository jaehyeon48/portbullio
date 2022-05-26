import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from 'super-simple-react-toast';

export default function AuthError() {
	const toast = useToast();
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	const prevPath = queryParams.get('path');

	useEffect(() => {
		if (!prevPath) {
			navigate('/', { replace: true });
		} else {
			toast.error({ message: '로그인에 실패했습니다. 다시 시도해 주세요.' });
			navigate(prevPath, { replace: true });
		}
	}, [toast, navigate, prevPath]);

	return null;
}
