import { ethers } from "ethers";
import { createContext, useContext } from "react";

export type TWeb3Context = {
    provider: ethers.providers.Web3Provider | null;
    connect: () => void;
    disconnect: () => void;
};

export const Web3Context = createContext<TWeb3Context | undefined>(undefined);

export function useWeb3() {
    return useContext(Web3Context);
}
