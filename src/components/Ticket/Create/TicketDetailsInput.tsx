import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ErrorInputStyled, InputStyled, LabelStyled } from "../../Styled";

import { TCreateTicketFormValues } from "../../../lib/types/form";

function TicketDetailsInputs() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<TCreateTicketFormValues>();
	const totalTicketWatch = watch("ticket.totalAvailable");

	return (
		<fieldset name="ticket_details">
			<LabelStyled>
				Total ticket available
				<InputStyled
					type="number"
					{...register("ticket.totalAvailable", {
						min: {
							value: 1,
							message: "Amount cannot be less than 1!",
						},
						required: true,
					})}
					step={1}
				/>
			</LabelStyled>

			<ErrorMessage
				errors={errors}
				name="ticket.totalAvailable"
				render={({ message }) => (
					<ErrorInputStyled>{message}</ErrorInputStyled>
				)}
			/>

			<LabelStyled>
				Maximum mint per user
				<InputStyled
					id="ticket_input_max_mint"
					type="number"
					step="1"
					{...register("ticket.maxMintPerUser", {
						min: {
							value: 1,
							message: "Amount cannot be less than 1!",
						},
						max: {
							value: totalTicketWatch,
							message:
								"Mint amount cannot be more than the total available!",
						},
						required: true,
					})}
				/>
			</LabelStyled>

			<ErrorMessage
				errors={errors}
				name="ticket.maxMintPerUser"
				render={({ message }) => (
					<ErrorInputStyled>{message}</ErrorInputStyled>
				)}
			/>

			<LabelStyled id="price-input-lable">
				Ticket price
				<InputStyled
					type="number"
					step="0.0001"
					placeholder="0 ETH"
					{...register("ticket.price", {
						min: {
							value: 0,
							message: "Ticket price cannot be less than 0!",
						},
						required: true,
					})}
				/>
			</LabelStyled>
		</fieldset>
	);
}

export default TicketDetailsInputs;
