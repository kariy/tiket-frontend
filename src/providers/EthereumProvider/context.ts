import { ethers } from "ethers";
import { createContext, useContext } from "react";

export type TEthereumContext = {
	defaultProvider: ethers.providers.BaseProvider | null;
};

export const EthereumContext = createContext<TEthereumContext>({
	defaultProvider: null,
});

export const useEthereum = () => useContext(EthereumContext);
