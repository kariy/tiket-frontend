import { Collection } from "./Collection";
import { useUser } from "providers/UserProvider";
import { useTicketCollection } from "./useTicketCollection";

export function CollectionContainer({ children }: React.PropsWithChildren<{}>) {
	const user = useUser();

	// get list of tickets owned by user
	const { isLoading, tickets } = useTicketCollection(user.current?.address);

	return (
		<div>
			{!isLoading && tickets.length ? (
				<Collection tickets={tickets} />
			) : (
				<div>loading</div>
			)}
		</div>
	);
}
