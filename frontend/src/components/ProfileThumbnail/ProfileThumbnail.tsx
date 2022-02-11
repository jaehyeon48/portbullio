import { User as UserIcon } from '@components/index';
import * as Style from './styles';

export default function ProfileThumbnail() {
	return (
		<Style.Container>
			<UserIcon width={36} height={36} />
		</Style.Container>
	);
}
