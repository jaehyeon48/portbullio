import * as React from 'react';

type AuthUpdateState = React.Dispatch<React.SetStateAction<boolean>>;

const AuthContext = React.createContext<boolean | null>(null);
const AuthUpdateContext = React.createContext<AuthUpdateState | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	return (
		<AuthContext.Provider value={isAuthenticated}>
			<AuthUpdateContext.Provider value={setIsAuthenticated}>{children}</AuthUpdateContext.Provider>
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const state = React.useContext(AuthContext);
	if (state === null) throw new Error('Cannot find AuthContextProvider');
	return state;
}

export function useAuthUpdate() {
	const state = React.useContext(AuthUpdateContext);
	if (state === null) throw new Error('Cannot find AuthUpdateContextProvider');
	return state;
}
