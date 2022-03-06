import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	InputStyled,
	LabelStyled,
	LineBreakStyled,
	InputFlexWrapperStyled,
	ErrorInputStyled,
} from "../../Styled";

import { TCreateTicketFormValues } from "../../../lib/types/form";

const LineBreak = styled(LineBreakStyled)`
	margin-top: 2.3rem;
	margin-bottom: 2.3rem;
`;

function EventDetailsInputs() {
	const {
		register,
		getValues,
		formState: { errors },
	} = useFormContext<TCreateTicketFormValues>();
	const formValues = getValues();

	return (
		<fieldset name="event_details">
			<LabelStyled>
				Event name*
				<InputStyled
					type="text"
					{...register("event.name", {
						required: true,
					})}
				/>
			</LabelStyled>

			<LabelStyled>
				Event date*
				<InputStyled
					type="datetime-local"
					{...register("event.date", {
						required: true,
					})}
				/>
			</LabelStyled>

			<InputFlexWrapperStyled>
				<LabelStyled>
					Event website*
					<InputStyled
						type="text"
						{...register("event.website", {
							required: true,
						})}
					/>
				</LabelStyled>

				<LabelStyled>
					Event contact*
					<InputStyled
						type="text"
						{...register("event.contact", {
							required: true,
						})}
					/>
				</LabelStyled>
			</InputFlexWrapperStyled>

			<LineBreak />

			<LabelStyled>
				Venue name*
				<InputStyled
					type="text"
					{...register("event.venue.name", { required: true })}
				/>
			</LabelStyled>

			<LabelStyled>
				Venue address*
				<InputStyled
					type="text"
					{...register("event.venue.address", { required: true })}
				/>
			</LabelStyled>
		</fieldset>
	);
}

export default EventDetailsInputs;
