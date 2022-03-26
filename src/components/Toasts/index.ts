import { toast, ToastOptions, TypeOptions } from "react-toastify";

type TToastStyledOptions = Omit<ToastOptions, "style" | "type">;

const ToastStyled = (
	message: string,
	type: TypeOptions = "default",
	options: TToastStyledOptions = {}
) =>
	toast(message, {
		style: {
			fontSize: "0.85rem",
			fontStyle: "italic",
			borderRadius: "10px",
		},
		type,
		...options,
	});

export const toastWalletReject = () =>
	ToastStyled("Wallet connection rejected", "error");

export const toastWrongNetwork = () =>
	ToastStyled("You are on the wrong network...", "error");
