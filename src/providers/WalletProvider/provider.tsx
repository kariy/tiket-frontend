import { JsonRpcSigner } from "@ethersproject/providers";
import React, { useCallback, useEffect, useState } from "react";

import { WalletContext } from "./context";
import { useWeb3WalletModal } from "@lib/hooks";

export function WalletProvider({ children }: React.PropsWithChildren<{}>) {
	/*/////////////////////////////////////////////////
    //    States
    /////////////////////////////////////////////////*/

	const { modal, web3Provider, connectModal, disconnectModal, isConnected } =
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
			// handle error here
			//
			// suggestion :
			// can display a toast if user reject
			return console.error({ e });
		}
	}, [connectModal]);

	const disconnect = useCallback(() => {
		disconnectModal();

		setConnectedAddress(null);
	}, [disconnectModal]);

	const handleAccountsChanged = useCallback(
		(accounts: string[]) => {
			if (!accounts.length) return disconnect();

			window.location.reload();
			// setConnectedAddress(accounts[0]);
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
		if (web3Provider) setSigner(web3Provider.getSigner());
	}, [web3Provider]);

	/*/////////////////////////////////////////////////
    //    Event listeners
    /////////////////////////////////////////////////*/

	useEffect(() => {
		if (web3Provider) {
			// @ts-ignore
			web3Provider.provider.on("chainChanged", handleChainChanged);

			return () =>
				// @ts-ignore
				web3Provider.provider.removeListener(
					"chainChanged",
					handleChainChanged
				);
		}
	}, [web3Provider, handleChainChanged]);

	useEffect(() => {
		if (web3Provider) {
			// @ts-ignore
			web3Provider?.provider.on("accountsChanged", handleAccountsChanged);

			return () => {
				// @ts-ignore
				web3Provider.provider.removeListener(
					"accountsChanged",
					handleAccountsChanged
				);
			};
		}
	}, [web3Provider, handleAccountsChanged]);

	return (
		<WalletContext.Provider
			value={{
				signer,
				isConnected,
				connectedAddress,
				provider: web3Provider,
				connect,
				disconnect,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}
