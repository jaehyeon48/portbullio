import { User as UserIcon, AddImage as AddImageIcon, Textarea, TextInput } from '@components/index';
import * as Style from './styles';

export default function UserSettings() {
	return (
		<Style.Container>
			<Style.ImageContainer aria-label="User profile image">
				<UserIcon width={60} height={60} />
				<Style.AddImageIconContainer>
					<AddImageIcon width={22} height={22} />
				</Style.AddImageIconContainer>
			</Style.ImageContainer>
			<Style.Form>
				<Textarea
					htmlFor="bio-input"
					labelName="내 설명"
					rows={5}
					cols={40}
					placeholder="내 설명"
				/>
				<TextInput htmlFor="location-input" labelName="위치" placeholder="내 위치" />
				<Style.Button type="submit">수정</Style.Button>
			</Style.Form>
		</Style.Container>
	);
}
