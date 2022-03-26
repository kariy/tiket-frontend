import { TNewTicketObject } from "@lib/hooks/useFactoryContract";
import { ContractTransaction } from "ethers";
import { createContext, useContext } from "react";
import {
	TicketFactory,
	TicketMarketplace,
} from "../../../types/ethers-contracts";

const StubFunc = (): any => {
	console.error({
		message: "FUNCTION_NOT_AVAILABLE",
		reason: "CALLING_STUB_FUNCTION",
	});
};

type TTiketContext = {
	factory: {
		createTicket: (
			newTicketObj: TNewTicketObject
		) => Promise<ContractTransaction | undefined>;
		getTicketsOfUser: (address: string) => Promise<void | string[]>;
		contract: TicketFactory | null;
	};
	marketplace: {
		buy: any;
		sell: any;
		contract: TicketMarketplace | null;
		getPriceOf: any;
		getTicketsOnSale: any;
	};
};

export const TiketContext = createContext<TTiketContext>({
	factory: {
		contract: null,

		createTicket: StubFunc,
		getTicketsOfUser: StubFunc,
	},
	marketplace: {
		contract: null,

		buy: StubFunc,
		sell: StubFunc,
		getPriceOf: StubFunc,
		getTicketsOnSale: StubFunc,
	},
});

export const useTiket = () => useContext(TiketContext);
