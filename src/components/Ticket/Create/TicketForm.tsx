import styled from "styled-components";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { TFormStage } from "../../../lib/hooks/useCreateTicketForm";
import {
	FormStageEnum,
	TCreateTicketFormValues,
} from "../../../lib/types/form";
import { FormStyled } from "../../Styled";

import EventDetailsInputs from "./EventDetailsInputs";
import TicketDetailsInputs from "./TicketDetailsInput";

import NextSVG from "../../../assets/svg/chevron-right.svg";
import PreviousSVG from "../../../assets/svg/chevron-left.svg";

const Form = styled(FormStyled)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	#form_wrapper {
		min-height: 400px;
		/* outline: 1px solid blue; */
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;

	margin-top: auto;
	margin-top: 2rem;

	button {
		display: flex;
		align-items: center;
		justify-content: space-between;

		border-radius: ${({ theme }) => theme.rounded.full};
		border: 2px solid ${({ theme }) => theme.colors.primary.medium};

		width: 150px;
		cursor: pointer;
		font-weight: 600;
		padding-top: 0.7em;
		padding-bottom: 0.7em;
		color: ${({ theme }) => theme.colors.primary.medium};
		background-color: ${({ theme }) => theme.colors.white};
		transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

		&:hover {
			color: ${({ theme }) => theme.colors.white};
			background-color: ${({ theme }) => theme.colors.primary.medium};
		}
	}

	#create_form_previous_button {
		margin-right: auto;
		padding-right: 2em;
		padding-left: 1em;
	}

	#create_form_next_button {
		margin-left: auto;
		padding-left: 2em;
		padding-right: 1em;
	}
`;

interface ICreateTicketFormProps {
	stage: TFormStage;
	onSubmit: SubmitHandler<TCreateTicketFormValues>;
}

function TicketForm({ stage, onSubmit }: ICreateTicketFormProps) {
	const { trigger, handleSubmit } = useFormContext<TCreateTicketFormValues>();

	const moveStage = (toStage: FormStageEnum) => stage.set(toStage);

	const handleMovePreviousStage = () => moveStage(stage.current - 1);

	const handleMoveNextStage = async () => {
		const isBeforeLastStage = stage.current < FormStageEnum.TICKET_POLICY;
		const isValid = await trigger(undefined, { shouldFocus: true });

		if (isValid && isBeforeLastStage) moveStage(stage.current + 1);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div id="form_wrapper">
				{stage.current === FormStageEnum.EVENT_DETAIL ? (
					<EventDetailsInputs />
				) : stage.current === FormStageEnum.TICKET_DETAIL ? (
					<TicketDetailsInputs />
				) : (
					<></>
				)}
			</div>

			<ButtonsWrapper>
				{stage.current !== FormStageEnum.EVENT_DETAIL ? (
					<button
						id="create_form_previous_button"
						type="button"
						onClick={() => handleMovePreviousStage()}
					>
						<PreviousSVG />
						Previous
					</button>
				) : null}

				<button
					id="create_form_next_button"
					type={
						stage.current === FormStageEnum.TICKET_POLICY
							? "submit"
							: "button"
					}
					onClick={() => handleMoveNextStage()}
				>
					{stage.current !== FormStageEnum.TICKET_POLICY
						? "Continue"
						: "Create ticket"}
					<NextSVG />
				</button>
			</ButtonsWrapper>
		</Form>
	);
}

export default TicketForm;
