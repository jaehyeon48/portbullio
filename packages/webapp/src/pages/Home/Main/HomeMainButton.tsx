import { SyntheticEvent } from 'react';
import { useAuth } from '@hooks/Auth';
import { useModal } from '@hooks/Modal';
import AuthPage from '@pages/Auth';
import { LinkButton, Button } from './styles';

interface Props {
	authText: string;
	unAuthText: string;
}

export default function HomeMainButton({ authText, unAuthText }: Props) {
	const isAuthenticated = useAuth();
	const { openModal } = useModal();

	function handleOpenLogInModal(e: SyntheticEvent) {
		openModal(e, <AuthPage />);
	}

	return (
		<>
			{isAuthenticated ? (
				<LinkButton to="/portfolios">{authText}</LinkButton>
			) : (
				<Button type="button" onClick={handleOpenLogInModal}>
					{unAuthText}
				</Button>
			)}
		</>
	);
}
