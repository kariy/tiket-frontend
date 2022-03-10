import { useState } from "react";

import { api } from "@lib/apis";
import { TUserSignUpData } from "@lib/apis/user";

type TSignUpError = {
	code: string;
	hint: string;
	message: string;
	details: string;
};

type TSignUpData = {
	id: string;
	email: string;
	created_at: string;
	public_address: string;
};

function useSignUp() {
	const [isLoading, setIsLoading] = useState(false);

	const [isError, setIsError] = useState(false);

	const [isSuccess, setIsSuccess] = useState(false);

	const [data, setData] = useState<TSignUpData | undefined>(undefined);

	const signUp = (credentials: TUserSignUpData) => {
		api.user
			.signUp(credentials)
			.then(function (response) {
				// console.log("axios success", response);
				setIsError(false);
				setIsSuccess(true);
				setIsLoading(false);
				setData(response.data);
			})
			.catch(function (error) {
				// console.log(error.response.data);
				setIsError(true);
				setIsSuccess(false);
				setIsLoading(false);
			});

		setIsLoading(true);
	};

	return {
		data,
		isError,
		isLoading,
		isSuccess,
		signUp,
		setIsLoading,
	};
}

export default useSignUp;
