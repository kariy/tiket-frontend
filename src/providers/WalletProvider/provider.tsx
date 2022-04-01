import { JsonRpcSigner } from "@ethersproject/providers";
import React, { useCallback, useEffect, useState } from "react";

import { WalletContext } from "./context";
import { useWeb3WalletModal } from "@lib/hooks";
import { toastWalletReject, toastWrongNetwork } from "@components/Toasts";

export function WalletProvider({ children }: React.PropsWithChildren<{}>) {
	/*/////////////////////////////////////////////////
    //    States
    /////////////////////////////////////////////////*/

	const { modal, provider, connectModal, disconnectModal, isConnected } =
		useWeb3WalletModal();

	const [connectedAddress, setConnectedAddress] = useState<string | null>(
		null
	);

	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

	/*/////////////////////////////////////////////////
    //    Functions
    /////////////////////////////////////////////////*/

	const connect = useCallback(async () => {
		try {
			const account = await connectModal();
			if (account) setConnectedAddress(account);
		} catch (e) {
			toastWalletReject();
			return console.error({ e, test: "hi" });
		}
	}, [connectModal]);

	const disconnect = useCallback(() => {
		disconnectModal();
	}, [disconnectModal]);

	const handleAccountsChanged = useCallback(
		(accounts: string[]) => {
			if (!accounts.length) return disconnect();
			window.location.reload();
		},
		[disconnect]
	);

	const handleChainChanged = useCallback(() => window.location.reload(), []);

	/*/////////////////////////////////////////////////
    //    Side effects
    /////////////////////////////////////////////////*/

	// connect wallet on page load if cached provider available
	useEffect(() => {
		if (modal && modal.cachedProvider) connect();
	}, [modal, connect]);

	useEffect(() => {
		if (!provider) return;

		/**
		 * @Toast
		 * Notify if wrong network/chain
		 */

		// toastWrongNetwork()

		// provider.getNetwork().then(console.log);

		setSigner(provider.getSigner());
	}, [provider]);

	/*/////////////////////////////////////////////////
    //    Event listeners
    /////////////////////////////////////////////////*/

	useEffect(() => {
		if (!provider) return;

		// @ts-ignore
		provider.provider.on("chainChanged", handleChainChanged);

		return () =>
			// @ts-ignore
			provider.provider.removeListener(
				"chainChanged",
				handleChainChanged
			);
	}, [provider, handleChainChanged]);

	useEffect(() => {
		if (!provider) return;

		// @ts-ignore
		provider.provider.on("accountsChanged", handleAccountsChanged);

		return () => {
			// @ts-ignore
			provider.provider.removeListener(
				"accountsChanged",
				handleAccountsChanged
			);
		};
	}, [provider, handleAccountsChanged]);

	return (
		<WalletContext.Provider
			value={{
				signer,
				provider,
				isConnected,
				connectedAddress,
				connect,
				disconnect,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}
