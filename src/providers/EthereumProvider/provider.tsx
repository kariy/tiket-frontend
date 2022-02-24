import { ethers } from "ethers";
import { useRef } from "react";
import { EthereumContext, TEthereumContext } from "./context";

export function EthereumProvider({ children }: React.PropsWithChildren<{}>) {
    const providerRef = useRef<TEthereumContext>();
    providerRef.current = ethers.getDefaultProvider(process.env.ETH_NET, {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_PROJECT_SECRET,
    });

    return (
        <EthereumContext.Provider value={providerRef.current}>
            {children}
        </EthereumContext.Provider>
    );
}
