import { CloseModalFn } from '@types';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
}

export default function Logout({ closeFunction }: Props) {
	return (
		<Style.PageContainer>
			<Style.Header>정말 로그아웃 하시겠습니까?</Style.Header>
			<Style.ButtonContainer>
				<Style.Button type="button" backgroundColor="darkGray" onClick={closeFunction}>
					취소
				</Style.Button>
				<Style.Button type="button" backgroundColor="deepRed">
					로그아웃
				</Style.Button>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
