import { SyntheticEvent } from 'react';
import { CloseModalFn } from '@types';
import { logOut } from '@api/auth';
import { useEmitter } from '@hooks/EventEmitter';
import useThemeMode from '@hooks/Theme';
import { LOG_OUT } from '@constants';
import toast from '@lib/toast';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
}

export default function Logout({ closeFunction }: Props) {
	const Emitter = useEmitter();
	const [themeMode] = useThemeMode();

	async function handleLogOut(e: SyntheticEvent) {
		const logOutResult = await logOut();
		if (!logOutResult) {
			toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.', themeMode, 'topRight');
			return;
		}
		Emitter.emit(LOG_OUT);
		toast.success('성공적으로 로그아웃 되었습니다.', themeMode, 'topRight');
		closeFunction!(e, false);
	}

	return (
		<Style.PageContainer>
			<Style.Header>정말 로그아웃 하시겠습니까?</Style.Header>
			<Style.ButtonContainer>
				<Style.Button type="button" backgroundColor="darkGray" onClick={closeFunction}>
					취소
				</Style.Button>
				<Style.Button type="button" backgroundColor="deepRed" onClick={handleLogOut}>
					로그아웃
				</Style.Button>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
