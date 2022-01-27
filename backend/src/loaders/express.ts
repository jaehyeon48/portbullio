import express from 'express';
import cookieParser from 'cookie-parser';
import { LoaderProps } from '@types';
import api from '@api';
import { morgan, formatMorgan } from './morgan';

export default async function expressLoader({ app }: LoaderProps) {
	app.use(morgan(formatMorgan));
	app.use(express.json());
	app.use(cookieParser());
	app.use('/api', api());
}
