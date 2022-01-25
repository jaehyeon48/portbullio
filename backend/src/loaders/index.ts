import { LoaderProps } from '@types';
import expressLoader from './express';

export default async function appLoader({ app }: LoaderProps) {
	await expressLoader({ app });
	console.log('Express loaded');
}
