import { createContext, useContext } from "react";
import { TCurrentUser } from "states/User";

type TUserContext = {
	current: TCurrentUser | null;
	isSignedIn: boolean;
	signIn: () => any;
	signOut: () => any;
};

export const UserContext = createContext<TUserContext>({
	current: null,
	isSignedIn: false,
	signIn: () => {},
	signOut: () => {},
});

export const useUser = () => useContext(UserContext);
