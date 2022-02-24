import { ethers } from "ethers";
import { createContext, useContext } from "react";

export type TEthereumContext = ethers.providers.BaseProvider;

export const provider = ethers.getDefaultProvider();

export const EthereumContext = createContext<TEthereumContext>(provider);

export function useEthereum() {
    return useContext(EthereumContext);
}
