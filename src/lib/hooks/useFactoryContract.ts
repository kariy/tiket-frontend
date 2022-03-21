import axios from "axios";
import { BigNumberish } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { TCreateTicketSignatureData } from "pages/api/contract/factory/allowCreateTicket";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from ".";
import {
	TicketFactory,
	TicketFactory__factory,
} from "../../../types/ethers-contracts";

export type TNewTicketObject = {
	event: {
		name: string;
		[key: string]: any;
	};
	ticket: {
		price: BigNumberish;
		total: BigNumberish;
		maxMint: BigNumberish;
	};
};

/**
 * @param address The factory contract's address
 */
export function useFactoryContract(address?: string) {
	const wallet = useWallet();
	const [contract, setContract] = useState<TicketFactory | null>(null);

	useEffect(() => {
		if (!wallet.signer || !address) return;

		setContract(TicketFactory__factory.connect(address, wallet.signer));
	}, [wallet.signer, address]);

	const createTicket = useCallback(
		async (newTicketObj: TNewTicketObject) => {
			if (!contract) return;

			const {
				event: { name, ...rest },
				ticket,
			} = newTicketObj;

			const ticketDetails = JSON.stringify(rest);

			// get signature /api/contract/factory/allowCreateTicket
			const signature = await getCreateTicketPermission({
				from: await contract.signer.getAddress(),
				to: contract.address,
				name,
				ticketDetails,
			});

			return contract.createTicket(
				name,
				ticket.total,
				ticket.price,
				ticket.maxMint,
				ticketDetails,
				signature
			);
		},
		[contract]
	);

	//
	// GETTERS
	//

	const getTicketsOfUser = useCallback(
		async (address: string) => {
			if (!contract) return;

			if (!isAddress(address))
				return console.error({ message: "INVALID_ADDRESS_FORMAT" });

			return contract.getTicketsOf(address);
		},
		[contract]
	);

	return {
		createTicket,

		getTicketsOfUser,

		contract,
	};
}

const getCreateTicketPermission = async (
	dataToSign: TCreateTicketSignatureData
) => {
	const { data } = await axios.post<string>(
		"/api/contract/factory/allowCreateTicket",
		dataToSign
	);

	return data;
};
