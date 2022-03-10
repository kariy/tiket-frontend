import styled from "styled-components";

import useSignUp from "./useSignUp";
import SignUpSuccess from "./SignUpSuccess";
import BarLoader from "@components/Loaders/BarLoader";
import SignUpForm, { TSignUpFormFields } from "./SignUpForm";

const BarLoaderStyled = styled(BarLoader)`
	box-shadow: 0 0 4px #0000006a;
`;

const LoadingOverlay = styled.div`
	display: flex;
	align-items: center;

	inset: 0;
	z-index: 1;
	position: absolute;

	backdrop-filter: blur(4px);
	background-color: rgba(221, 221, 221, 0.178);

	& > div {
		position: relative;
		margin: 0 auto;
	}

	#loader-text {
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;

		font-weight: 500;
		font-size: 0.85rem;
		text-align: center;
		font-style: italic;
		text-shadow: 0 1px 2px #0000004c;
	}
`;

function SignUpFormContainer() {
	const { setIsLoading, isLoading, signUp, isSuccess } = useSignUp();

	const handleSubmit = (data: TSignUpFormFields) => {
		if (!data.email || !data.public_address)
			return console.error({
				message: "SIGN_UP_ERROR",
				error: "REQUIRED_DATA_MISSING",
			});

		signUp(data);
	};

	return isSuccess ? (
		<SignUpSuccess />
	) : (
		<div>
			{isLoading ? (
				<LoadingOverlay>
					<div>
						<BarLoaderStyled />
						<div id="loader-text">Creating your account...</div>
					</div>
				</LoadingOverlay>
			) : null}

			<SignUpForm onSubmit={handleSubmit} setLoading={setIsLoading} />
		</div>
	);
}

export default SignUpFormContainer;
