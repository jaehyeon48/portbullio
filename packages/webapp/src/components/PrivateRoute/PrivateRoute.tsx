import { ReactElement } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface Props {
	isAllowed: boolean;
	fallbackUrl?: string;
	children?: ReactElement;
}

export default function PrivateRoute({
	isAllowed,
	fallbackUrl = '/',
	children
}: Props): ReactElement {
	if (!isAllowed) {
		return <Navigate to={fallbackUrl} replace />;
	}

	return children ?? <Outlet />;
}
