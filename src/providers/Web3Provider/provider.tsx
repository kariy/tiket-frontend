import { useEffect } from "react";

import { Web3Context } from "./context";
import { signIn } from "../../state/User";
import { useWeb3Modal } from "../../hooks";

export function Web3Provider({ children }: React.PropsWithChildren<{}>) {
    const { modal, web3Provider, connect, disconnect } = useWeb3Modal();

    useEffect(() => {
        if (!web3Provider) return;

        web3Provider
            .listAccounts()
            .then((accounts: string[]) => signIn({ address: accounts[0] }));

        // @ts-ignore
        web3Provider.provider.on("chainChanged", () =>
            window.location.reload()
        );

        // @ts-ignore
        web3Provider.provider.on("accountsChanged", (accounts: string[]) => {
            if (!accounts.length) return disconnect();

            signIn({ address: accounts[0] });
        });
    }, [web3Provider, modal, disconnect]);

    return (
        <Web3Context.Provider
            value={{
                provider: web3Provider,
                connect,
                disconnect,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}
