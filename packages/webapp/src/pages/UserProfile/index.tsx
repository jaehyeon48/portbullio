import { useState, SyntheticEvent, useEffect } from 'react';
import { Textarea, TextInput } from '@components/index';
import { useUserProfile } from '@hooks/ReactQuery';
import AvatarImagePicker from './AvatarImagePicker';
import * as Style from './styles';

export default function UserProfile() {
	const profile = useUserProfile();
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [location, setLocation] = useState('');

	useEffect(() => {
		setUsername(profile.data?.username ?? '');
		setBio(profile.data?.bio ?? '');
		setLocation(profile.data?.location ?? '');
	}, [profile.data]);

	function handleChangeUsername(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setUsername(target.value);
	}

	function handleChangeBio(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setBio(target.value);
	}

	function handleChangeLocation(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setLocation(target.value);
	}

	return (
		<Style.Container>
			<AvatarImagePicker />
			<Style.Form>
				<TextInput
					htmlFor="profile-user-email"
					labelName="이메일"
					type="text"
					value={profile.data?.email ?? ''}
					readOnly
				/>
				<TextInput
					htmlFor="profile-username-input"
					labelName="닉네임"
					type="text"
					value={username}
					handleChange={handleChangeUsername}
				/>
				<Textarea
					htmlFor="profile-bio-input"
					labelName="내 설명"
					rows={5}
					cols={40}
					placeholder="내 설명"
					value={bio}
					handleChange={handleChangeBio}
				/>
				<TextInput
					htmlFor="profile-location-input"
					labelName="위치"
					placeholder="내 위치"
					value={location}
					handleChange={handleChangeLocation}
				/>
				<Style.ModifyProfileButton type="submit">프로필 수정</Style.ModifyProfileButton>
			</Style.Form>
		</Style.Container>
	);
}
