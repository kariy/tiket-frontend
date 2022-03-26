import styled from "styled-components";
import { useCallback, useRef } from "react";
import { SubmitHandler, useFormContext, UseFormReset } from "react-hook-form";

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
import {
	CreateTicketFailed,
	CreateTicketSuccess,
	CreateTicketWaiting,
} from "./requestStateComponents";

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
		padding-left: 1em;
		padding-right: 2em;
		margin-right: auto;
	}

	#create_form_next_button {
		margin-left: auto;
		padding-left: 2em;
		padding-right: 1em;
	}
`;

const getFormStageComponent = (stage: TFormStage) => {
	switch (stage.current) {
		case FormStageEnum.EVENT_DETAIL:
			return <EventDetailsInputs />;
		case FormStageEnum.TICKET_DETAIL:
			return <TicketDetailsInputs />;
		case FormStageEnum.TICKET_POLICY:
			return <div>placeholder</div>;
		case FormStageEnum.WAITING:
			return (
				<CreateTicketWaiting
					onSuccess={() => stage.set(FormStageEnum.SUCCESS)}
				/>
			);
		case FormStageEnum.SUCCESS:
			return <CreateTicketSuccess />;
		case FormStageEnum.FAIL:
			return <CreateTicketFailed />;
		default:
			return null;
	}
};

export type TCreateTicketFormSubmitHandler = (
	data: TCreateTicketFormValues,
	reset: UseFormReset<TCreateTicketFormValues>
) => any;

interface ICreateTicketFormProps {
	stage: TFormStage;
	onSubmit: TCreateTicketFormSubmitHandler;
}

function TicketForm({ stage, onSubmit }: ICreateTicketFormProps) {
	const { trigger, handleSubmit, reset } =
		useFormContext<TCreateTicketFormValues>();

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleMoveNextStage = useCallback(async () => {
		const isValid = await trigger(undefined, { shouldFocus: true });
		const isBeforeLastStage = stage.current < FormStageEnum.TICKET_POLICY;

		if (isValid && isBeforeLastStage) stage.set((value) => value + 1);
		else if (isValid && formRef.current) formRef.current.requestSubmit();
	}, [stage, trigger]);

	const submitHandlerWrapper: SubmitHandler<TCreateTicketFormValues> =
		useCallback((data) => onSubmit(data, reset), [onSubmit, reset]);

	return (
		<Form onSubmit={handleSubmit(submitHandlerWrapper)} ref={formRef}>
			<div id="form_wrapper">{getFormStageComponent(stage)}</div>

			<ButtonsWrapper>
				{stage.current >= FormStageEnum.EVENT_DETAIL &&
				stage.current <= FormStageEnum.TICKET_POLICY ? (
					<button
						type="button"
						id="create_form_previous_button"
						onClick={() => stage.set((value) => value - 1)}
					>
						<PreviousSVG />
						Previous
					</button>
				) : null}

				{stage.current >= FormStageEnum.WAITING || (
					<button
						type="button"
						id="create_form_next_button"
						onClick={handleMoveNextStage}
					>
						{stage.current !== FormStageEnum.TICKET_POLICY
							? "Continue"
							: "Create ticket"}
						<NextSVG />
					</button>
				)}
			</ButtonsWrapper>
		</Form>
	);
}

export default TicketForm;
