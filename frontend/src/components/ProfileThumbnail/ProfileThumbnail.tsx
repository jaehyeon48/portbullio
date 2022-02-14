import { AvatarImage } from '@components/index';
import Container from './styles';

export default function ProfileThumbnail() {
	return (
		<Container>
			<AvatarImage userIconWidth={36} userIconHeight={36} />
		</Container>
	);
}
