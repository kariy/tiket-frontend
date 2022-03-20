import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { api } from "@lib/apis";
import { RootState } from "states";
import { setUser } from "states/User";
import { UserContext } from "./context";
import { useSignUpModal } from "@lib/hooks";
import { useWallet } from "providers/WalletProvider";

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
	const wallet = useWallet();
	const signUpModal = useSignUpModal();
	const user = useSelector((state: RootState) => state.user);

	/*/////////////////////////////////////////////////
	//    Callbacks
	/////////////////////////////////////////////////*/

	const signIn = useCallback(() => {
		if (!wallet.signer)
			return console.error({
				message: "UNABLE_TO_SIGN_IN",
				reason: "WALLET_NOT_CONNECTED",
			});

		api.user
			.signIn(wallet.signer)
			.then(function ({ data }) {
				window.location.reload();
			})
			.catch(function (err) {
				if (err.response.data.message === "USER_DOES_NOT_EXIST")
					signUpModal.open();
			});
	}, [wallet.signer, signUpModal]);

	const signOut = useCallback(() => {
		if (!user.isSignedIn && !user.current)
			return console.error({
				message: "UNABLE_TO_SIGN_OUT",
				reason: "NOT_SIGNED_IN",
			});

		api.user.signOut();
	}, [user]);

	/*/////////////////////////////////////////////////
	//    Side effects
	/////////////////////////////////////////////////*/

	useEffect(() => {
		if (wallet.connectedAddress)
			api.user
				.authorize()
				.then(({ data }) => {
					if (wallet.connectedAddress !== data.user.public_address)
						return console.error({
							message: "UNABLE_TO_SIGN_IN",
							reason: "DIFFERENT_ADDRESS_STORED_IN_SESSION",
						});

					setUser({
						id: data.user.id,
						email: data.user.email,
						address: data.user.public_address,
					});
				})
				.catch((e) => {
					console.error(e);
					api.user.deleteAuthCookies();
				});

		console.error({
			message: "UNABLE_TO_SIGN_IN",
			reason: "WALLET_NOT_CONNECTED",
		});
	}, [wallet.connectedAddress]);

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
