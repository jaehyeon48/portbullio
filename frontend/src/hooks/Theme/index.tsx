import { useState } from 'react';
import { Theme } from '@types';

export default function useThemeMode(): [Theme, () => void] {
	const [themeMode, setThemeMode] = useState<Theme>(setInitialTheme);

	function setInitialTheme(): Theme {
		const storedTheme = localStorage.getItem('theme');
		if (isValidThemeType(storedTheme)) return storedTheme as Theme;
		if (matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
		return 'light';
	}

	function toggleThemeMode() {
		setThemeMode(prevThemeMode => (prevThemeMode === 'light' ? 'dark' : 'light'));
		localStorage.setItem('theme', themeMode === 'light' ? 'dark' : 'light');
	}

	return [themeMode, toggleThemeMode];
}

function isValidThemeType(theme: string | null): boolean {
	return !!((theme && theme === 'light') || theme === 'dark');
}
