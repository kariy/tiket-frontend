import React from "react";
import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
	return (
		<ToastContainer
			theme="colored"
			autoClose={3000}
			position="bottom-left"
		/>
	);
}
