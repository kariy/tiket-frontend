import { ethers } from "ethers";
import { useState } from "react";

import { EthereumContext } from "./context";

const ETH_NETWORK =
	process.env.NODE_ENV === "production" ? "ropsten" : "http://localhost:8545";

export function EthereumProvider({ children }: React.PropsWithChildren<{}>) {
	const [defaultProvider] = useState<ethers.providers.BaseProvider>(
		ethers.getDefaultProvider(ETH_NETWORK, {
			projectId: process.env.INFURA_PROJECT_ID,
			projectSecret: process.env.INFURA_PROJECT_SECRET,
		})
	);

	return (
		<EthereumContext.Provider
			value={{
				defaultProvider,
			}}
		>
			{children}
		</EthereumContext.Provider>
	);
}
