import { BigNumberish, PayableOverrides } from "ethers";
import { useCallback, useEffect, useState } from "react";

import { useWallet } from ".";
import { Ticket, Ticket__factory } from "../../../types/ethers-contracts";

export function useTicketContract(address: string) {
	const wallet = useWallet();

	const [contract, setContract] = useState<Ticket | null>(null);

	useEffect(() => {
		if (!wallet.signer) return;

		setContract(Ticket__factory.connect(address, wallet.signer));
	}, [wallet.signer, address]);

	const mint = useCallback(
		async (
			overrides?: PayableOverrides & { from?: string | Promise<string> }
		) => {
			if (!contract) return;

			return contract.mintTicket(overrides);
		},
		[contract]
	);

	//
	// GETTERS
	//

	const getName = useCallback(async () => {
		if (!contract) return;

		return contract.getName();
	}, [contract]);

	const getTicketDetails = useCallback(async () => {
		if (!contract) return;

		const value = await contract.getTicketDetails();

		return JSON.parse(value);
	}, [contract]);

	const getMintPrice = useCallback(async () => {
		if (!contract) return;

		return contract.getMintPrice();
	}, [contract]);

	const getMaxMint = useCallback(async () => {
		if (!contract) return;

		return contract.getMaxMint();
	}, [contract]);

	const getOwnerOf = useCallback(
		async (ticketId: BigNumberish) => {
			if (!contract) return;

			return contract.ownerOf(ticketId);
		},
		[contract]
	);

	const getTotalAvailableTickets = useCallback(async () => {
		if (!contract) return;

		return contract.totalAvailable();
	}, [contract]);

	const getTotalMintedTickets = useCallback(async () => {
		if (!contract) return;

		return contract.totalMinted();
	}, [contract]);

	return {
		mint,

		getName,
		getMaxMint,
		getOwnerOf,
		getMintPrice,
		getTicketDetails,
		getTotalMintedTickets,
		getTotalAvailableTickets,

		contract,
	};
}
