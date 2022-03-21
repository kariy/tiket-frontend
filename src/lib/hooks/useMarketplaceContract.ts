import { isAddress } from "ethers/lib/utils";
import { BigNumberish, PayableOverrides } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
	TicketMarketplace,
	TicketMarketplace__factory,
} from "../../../types/ethers-contracts";

import { useWallet } from ".";

/**
 * @param address The contract's address
 */
export function useMarketplaceContract(address?: string) {
	const wallet = useWallet();

	const [contract, setContract] = useState<TicketMarketplace | null>(null);

	useEffect(() => {
		if (!wallet.signer || !address) return;

		setContract(TicketMarketplace__factory.connect(address, wallet.signer));
	}, [wallet.signer, address]);

	const buy = useCallback(
		async (
			ticketAddress: string,
			ticketId: BigNumberish,
			overrides?: PayableOverrides & { from?: string | Promise<string> }
		) => {
			if (!contract) return;

			if (!isAddress(ticketAddress))
				return console.error({ message: "INVALID_ADDRESS_FORMAT" });

			return contract.buyTicket(ticketAddress, ticketId, overrides);
		},
		[contract]
	);

	const sell = useCallback(
		async (
			ticketAddress: string,
			ticketId: BigNumberish,
			price: BigNumberish
		) => {
			if (!contract) return;

			if (!isAddress(ticketAddress))
				return console.error({ message: "INVALID_ADDRESS_FORMAT" });

			return contract.sellTicket(ticketAddress, ticketId, price);
		},
		[contract]
	);

	//
	// GETTERS
	//

	const getPriceOf = useCallback(
		async (ticketAddress: string, ticketId: BigNumberish) => {
			if (!contract) return;

			if (!isAddress(ticketAddress))
				return console.error({ message: "INVALID_ADDRESS_FORMAT" });

			return contract.getPriceOf(ticketAddress, ticketId);
		},
		[contract]
	);

	const getTicketsOnSale = useCallback(
		async (ticketAddress: string) => {
			if (!contract) return;

			if (!isAddress(ticketAddress))
				return console.error({ message: "INVALID_ADDRESS_FORMAT" });

			return contract.getOnSaleTickets(ticketAddress);
		},
		[contract]
	);

	return {
		buy,

		sell,

		getPriceOf,

		getTicketsOnSale,

		contract,
	};
}
