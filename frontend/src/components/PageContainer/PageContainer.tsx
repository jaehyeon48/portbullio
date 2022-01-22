import { ReactNode } from 'react';
import PageContainerStyle from './style';

interface Props {
	children: ReactNode;
	ariaLabel?: string;
}

function PageContainer({ children, ariaLabel }: Props) {
	return <PageContainerStyle aria-label={ariaLabel}>{children}</PageContainerStyle>;
}

export default PageContainer;
