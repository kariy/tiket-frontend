import { useCallback } from "react";
import styled from "styled-components";
import { FormProvider } from "react-hook-form";

import FormProgressBar from "./FormProgressBar";
import { SectionHeaderStyled } from "../../Styled";
import { useWallet } from "providers/WalletProvider";
import { useTicketFactory } from "providers/TiketProvider";
import { useCreateTicketForm } from "@lib/hooks/useCreateTicketForm";
import { FormStageEnum, TCreateTicketFormValues } from "@lib/types/form";
import TicketForm, { TCreateTicketFormSubmitHandler } from "./TicketForm";

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	grid-template-rows: min-content 1fr;
`;

const Container = styled.div`
	flex: 1;
	display: grid;
	grid-template-rows: min-content 1fr;
`;

const formDefaultValues: Omit<TCreateTicketFormValues, "ticket"> = {
	event: {
		name: "",
		date: "",
		contact: "",
		website: "",
		venue: { address: "", name: "" },
	},
};

const getSectionTitle = (stage: FormStageEnum) => {
	switch (stage) {
		case FormStageEnum.EVENT_DETAIL:
			return "Event details";
		case FormStageEnum.TICKET_DETAIL:
			return "Ticket details";
		case FormStageEnum.TICKET_POLICY:
			return "Ticket policies";
		case FormStageEnum.WAITING:
			return "Processing request";
		case FormStageEnum.SUCCESS:
			return "Request successful";
		default:
			return "";
	}
};

function TicketFormContainer() {
	const wallet = useWallet();
	const factory = useTicketFactory();

	const { stage, ...useFormMethods } =
		useCreateTicketForm<TCreateTicketFormValues>({
			mode: "onChange",
			defaultValues: formDefaultValues,
		});

	const handleFormSubmit: TCreateTicketFormSubmitHandler = useCallback(
		function (data, reset) {
			const {
				event: { name, ...rest },
				ticket,
			} = data;

			factory
				.createTicket({
					event: { name, ...rest },
					ticket: {
						price: ticket.price,
						maxMint: ticket.maxMintPerUser,
						total: ticket.totalAvailable,
					},
				})
				.then(() => stage.set(FormStageEnum.WAITING))
				.catch(() => {
					console.error({
						message: "UNABLE_TO_PROCESS_CREATE_TICKET_REQUEST",
					});
					stage.set(FormStageEnum.FAIL);
				});
		},
		[stage, factory]
	);

	return (
		<Container>
			<FormProgressBar stage={stage.current} />
			<Wrapper>
				<SectionHeaderStyled>
					{getSectionTitle(stage.current)}
				</SectionHeaderStyled>

				<FormProvider {...useFormMethods}>
					<TicketForm stage={stage} onSubmit={handleFormSubmit} />
				</FormProvider>
			</Wrapper>
		</Container>
	);
}

export default TicketFormContainer;
