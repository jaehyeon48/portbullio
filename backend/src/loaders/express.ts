import express from 'express';
import cookieParser from 'cookie-parser';
import { LoaderProps } from '@types';
import api from '@api';

export default async function expressLoader({ app }: LoaderProps) {
	app.use(express.json());
	app.use(cookieParser());
	app.use('/api', api());
}
