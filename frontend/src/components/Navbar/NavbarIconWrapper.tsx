import { ReactNode } from 'react';
import { IconWrapper } from './style';

interface Props {
	children: ReactNode;
}

export default function NavbarIconWrapper({ children }: Props) {
	return (
		<IconWrapper flexDirection="column" alignItems="center">
			{children}
		</IconWrapper>
	);
}
