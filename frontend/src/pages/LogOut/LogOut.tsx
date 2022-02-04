import { SyntheticEvent } from 'react';
import { CloseModalFn } from '@types';
import { logOut } from '@api/auth';
import { useEmitter } from '@hooks/EventEmitter';
import { LOG_OUT } from '@constants';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
}

export default function Logout({ closeFunction }: Props) {
	const Emitter = useEmitter();

	async function handleLogOut(e: SyntheticEvent) {
		logOut();
		Emitter.emit(LOG_OUT);
		closeFunction!(e);
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
