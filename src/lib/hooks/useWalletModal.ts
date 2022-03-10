import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState, useEffect, useCallback } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: process.env.INFURA_PROJECT_ID,
		},
	},
};

export function useWeb3WalletModal() {
	const [isConnected, setIsConnected] = useState(false);

	const [web3Provider, setWeb3Provider] =
		useState<ethers.providers.Web3Provider | null>(null);

	const [modal, setModal] = useState<Web3Modal | null>(null);

	const connectModal = useCallback(
		async function () {
			if (!modal) return;

			const wallet = await modal.connect();
			const provider = new ethers.providers.Web3Provider(wallet);
			const signer = provider.getSigner();

			setIsConnected(true);
			setWeb3Provider(provider);

			return await signer.getAddress();
		},
		[modal]
	);

	const disconnectModal = useCallback(() => {
		if (!modal) return;

		modal.clearCachedProvider();
		window.location.reload();
	}, [modal]);

	useEffect(() => {
		setModal(
			new Web3Modal({
				cacheProvider: true,
				providerOptions,
			})
		);
	}, []);

	useEffect(() => {
		if (modal && modal.cachedProvider) connectModal();
	}, [modal, connectModal]);

	return {
		modal,
		isConnected,
		web3Provider,
		connectModal,
		disconnectModal,
	};
}
