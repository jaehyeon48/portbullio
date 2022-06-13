import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@src/App';
import AppProviders from '@components/AppProviders';
import './font.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>
);
