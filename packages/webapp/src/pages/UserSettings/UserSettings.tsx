import { Textarea, TextInput } from '@components/index';
import AvatarImagePicker from './AvatarImagePicker';
import * as Style from './styles';

export default function UserSettings() {
	return (
		<Style.Container>
			<AvatarImagePicker />
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
