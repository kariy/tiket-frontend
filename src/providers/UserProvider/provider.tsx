import Cookies from "js-cookie";
import { RootState } from "state";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { UserContext } from "./context";
import { setUser } from "state/User/actions";
import { useWallet } from "providers/WalletProvider";

import { UserAPI } from "@lib/apis";
import { USER_SESSION_TOKEN } from "@lib/constants/misc";

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
	const wallet = useWallet();
	const user = useSelector((state: RootState) => state.user);

	/*/////////////////////////////////////////////////
	//    Callbacks
	/////////////////////////////////////////////////*/

	const signIn = useCallback(() => {
		if (!wallet.signer) return;

		UserAPI.signIn(wallet.signer)
			.then((res) => res.json())
			.then((data) => {
				Cookies.set(USER_SESSION_TOKEN, data.sessionToken);
				window.location.reload();
			});
	}, [wallet.signer]);

	const signOut = useCallback(() => {
		// delete jwt token from cookie
		Cookies.remove(USER_SESSION_TOKEN);
		window.location.reload();
	}, []);

	/*/////////////////////////////////////////////////
	//    Side effects
	/////////////////////////////////////////////////*/

	useEffect(() => {
		// try to sign in every time on page load
		// retrieve jwt token from cookie
		// if token exists:
		// 		call api to validate
		// else:
		// 		do nothing

		if (wallet.isConnected)
			UserAPI.authorize()
				.then((res) => res.json())
				.then((data) => setUser({ address: data.payload.user }))
				.catch((e) => Cookies.remove(USER_SESSION_TOKEN));
	}, [wallet.isConnected]);

	return (
		<UserContext.Provider
			value={{
				current: user.current,
				isSignedIn: user.isSignedIn,
				signIn,
				signOut,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
