import { ReactNode } from 'react';
import { NavLinkWrapper } from './style';

interface Props {
	children: ReactNode;
	to: string;
}

export default function NavbarLink({ children, to }: Props) {
	return <NavLinkWrapper to={to}>{children}</NavLinkWrapper>;
}
