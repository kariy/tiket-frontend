import { useRef } from "react";
import { ethers } from "ethers";

import { EthereumContext } from "./context";

export function EthereumProvider({ children }: React.PropsWithChildren<{}>) {
	const defaultProviderRef = useRef<ethers.providers.BaseProvider>(
		ethers.getDefaultProvider(process.env.ETH_NET, {
			projectId: process.env.INFURA_PROJECT_ID,
			projectSecret: process.env.INFURA_PROJECT_SECRET,
		})
	);

	return (
		<EthereumContext.Provider
			value={{
				defaultProvider: defaultProviderRef.current,
			}}
		>
			{children}
		</EthereumContext.Provider>
	);
}
