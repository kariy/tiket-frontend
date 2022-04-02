import { useEffect, useState } from "react";
import { useTiket } from "providers/TiketProvider";

/**
 *
 * @param owner A valid Ethereum address
 */
export function useTicketCollection(owner: string = "") {
	const { factory } = useTiket();

	const [tickets, setTickets] = useState<string[]>([]);

	const [isError, setIsError] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!owner) return;

		factory
			.getTicketsOfUser(owner)
			.then((tickets) => {
				setIsError(false);
				setIsLoading(false);
				setTickets(tickets || []);
			})
			.catch(() => setIsError(true));

		setIsLoading(true);
	}, [factory, owner]);

	return {
		tickets,
		isError,
		isLoading,
		user: owner,
	};
}
