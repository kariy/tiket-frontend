import { useState } from "react";
import {
	FieldValues,
	useForm,
	UseFormProps,
	UseFormReturn,
} from "react-hook-form";
import { FormStageEnum } from "../types/form";

export type TFormStage = {
	current: FormStageEnum;
	set: (stage: FormStageEnum) => void;
};

export interface TCreateTicketFormReturn<T, P> extends UseFormReturn<T, P> {
	stage: TFormStage;
}

export function useCreateTicketForm<
	T extends FieldValues = FieldValues,
	P = any
>(
	formOptions?: UseFormProps<T, P>,
	initialStage?: FormStageEnum
): TCreateTicketFormReturn<T, P> {
	const form = useForm<T, P>(formOptions);

	const [stage, setStage] = useState<FormStageEnum>(
		initialStage || FormStageEnum.EVENT_DETAIL
	);

	return {
		...form,
		stage: {
			current: stage,
			set: setStage,
		},
	};
}
