import { ethers } from "ethers";
import { createContext, useContext } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";

type TWalletContext = {
	isConnected: boolean;
	signer: JsonRpcSigner | null;
	connectedAddress: string | null;
	provider: ethers.providers.Web3Provider | null;
	connect: () => any;
	disconnect: () => any;
};

export const WalletContext = createContext<TWalletContext>({
	signer: null,
	provider: null,
	isConnected: false,
	connectedAddress: null,
	connect: () => {},
	disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);
