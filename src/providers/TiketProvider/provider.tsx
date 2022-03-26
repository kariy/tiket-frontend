import React from "react";

import { TiketContext, useTiket } from "./context";
import { useFactoryContract } from "@lib/hooks/useFactoryContract";
import { useMarketplaceContract } from "@lib/hooks/useMarketplaceContract";

export function TiketProvider({ children }: React.PropsWithChildren<{}>) {
	const factory = useFactoryContract(process.env.TIKET_FACTORY_CONTRACT);
	const marketplace = useMarketplaceContract(
		process.env.TIKET_MARKETPLACE_CONTRACT
	);

	return (
		<TiketContext.Provider
			value={{
				factory,
				marketplace,
			}}
		>
			{children}
		</TiketContext.Provider>
	);
}

export const useTicketFactory = () => useTiket().factory;

export const useTicketMarketplace = () => useTiket().marketplace;
