export type TCreateTicketFormValues = {
	event: {
		name: string;
		date: string;
		website: string;
		contact: string;
		venue: {
			name: string;
			address: string;
		};
	};
	ticket: {
		totalAvailable: number;
		maxMintPerUser: number;
		price: number;
		policy: any;
	};
};

export enum FormStageEnum {
	EVENT_DETAIL,
	TICKET_DETAIL,
	TICKET_POLICY,
}
