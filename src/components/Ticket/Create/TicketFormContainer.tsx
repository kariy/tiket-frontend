import styled from "styled-components";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { useCreateTicketForm } from "../../../lib/hooks/useCreateTicketForm";

import TicketForm from "./TicketForm";
import FormProgressBar from "./FormProgressBar";
import { SectionHeaderStyled } from "../../Styled";

import { FormStageEnum, TCreateTicketFormValues } from "@lib/types/form";

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

const formDefaultValues: TCreateTicketFormValues = {
	event: {
		name: "",
		date: "",
		contact: "",
		website: "",
		venue: { address: "", name: "" },
	},
	ticket: {
		price: 0,
		maxMintPerUser: 0,
		totalAvailable: 0,
		policy: null,
	},
};

function TicketFormContainer() {
	const { stage, ...useFormMethods } =
		useCreateTicketForm<TCreateTicketFormValues>({
			mode: "onChange",
			defaultValues: formDefaultValues,
		});

	const handleFormSubmit: SubmitHandler<TCreateTicketFormValues> = function (
		data
	) {
		console.log("create ticket form data", data);
	};

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

function getSectionTitle(stage: FormStageEnum): string {
	switch (stage) {
		case FormStageEnum.EVENT_DETAIL:
			return "Event details";
		case FormStageEnum.TICKET_DETAIL:
			return "Ticket details";
		case FormStageEnum.TICKET_POLICY:
			return "Ticket policies";
		default:
			return "";
	}
}

export default TicketFormContainer;
