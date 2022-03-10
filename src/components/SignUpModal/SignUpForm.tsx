import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";

import { useWallet } from "providers/WalletProvider";
import { MEDIA_DIMENSIONS } from "@lib/constants/media";

import {
	H1Styled,
	InputStyled,
	LineBreakStyled,
	ErrorInputStyled,
} from "../Styled";

import WalletSVG from "../../assets/svg/wallet.svg";
import { api } from "@lib/apis";

const WalletIcon = styled(WalletSVG)`
	height: 15px;
	margin-right: 13px;
	color: ${({ theme }) => theme.colors.black};
`;

const Input = styled(InputStyled)`
	margin-top: 0;
	padding: 0.9em 1.3em;
`;

const Container = styled.div`
	${({ theme }) => css`
		${H1Styled} {
			/* width: 70%; */
			margin-top: 0.5rem;
			margin-bottom: 2.5rem;
		}

		#form__input-label {
			font-weight: 500;
		}

		#content__input-wrapper {
			gap: 10px;
			display: flex;
			flex-wrap: wrap;
			margin-top: 15px;

			${Input} {
				flex: 3;
				min-width: 300px;
			}

			button {
				flex: 1;
				min-width: 120px;
				font-weight: 600;

				cursor: pointer;
				padding: 0.9em 1em;
				border-radius: ${theme.rounded.md};
				color: ${theme.colors.primary.medium};
				background-color: ${theme.colors.white};
				transition: background-color 100ms ease-in-out,
					color 100ms ease-in-out;
				border: 2px solid ${theme.colors.primary.medium};

				:hover {
					color: ${theme.colors.white};
					background-color: ${theme.colors.primary.medium};
				}

				:focus {
					outline: 3px solid ${theme.colors.primary.light};
				}
			}
		}

		${LineBreakStyled} {
			margin-top: 2.5rem;
			margin-bottom: 1.5rem;
		}

		${ErrorInputStyled} {
			margin-top: 0.8rem;
			font-style: normal;
		}

		#form__wallet-wrapper {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 10px;
			font-size: 0.85rem;

			div:first-child {
				font-weight: 500;
			}
		}

		#form__wallet-address {
			display: flex;
			align-items: center;

			padding: 0.6em 1em;
			border-radius: ${theme.rounded.full};
			border: 1px solid ${theme.colors.grey.dark};
		}

		@media only screen and (max-width: ${MEDIA_DIMENSIONS.COMPACT}) {
			#form__title {
				width: 70%;
			}
		}

		@media only screen and (min-width: ${MEDIA_DIMENSIONS.SMALL}) {
			#form__title {
				width: max-content;
			}
		}
	`}
`;

export type TSignUpFormFields = {
	email: string;
	public_address: string;
};

type TSignUpFormProps = {
	setLoading: (value: boolean) => any;
	onSubmit: (data: TSignUpFormFields) => any;
};

function SignUpForm({ onSubmit, setLoading }: TSignUpFormProps) {
	const wallet = useWallet();

	const {
		register,
		setValue,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<TSignUpFormFields>({
		defaultValues: {
			email: "",
			public_address: wallet.connectedAddress || "",
		},
	});

	useEffect(() => {
		console.log("connected address", wallet.connectedAddress);
		if (wallet.connectedAddress)
			setValue("public_address", wallet.connectedAddress);
	}, [wallet.connectedAddress, setValue]);

	const handleFormSubmit = useCallback(
		async (data: TSignUpFormFields) => {
			setLoading(true);

			// check if email is used
			const isExist = await api.user.checkIfEmailExist(data.email);

			if (isExist) {
				setLoading(false);

				return setError("email", {
					type: "validate",
					message: "That email is already in used.",
				});
			}

			onSubmit(data);
		},
		[onSubmit, setError, setLoading]
	);

	return (
		<Container>
			<H1Styled>
				Oops! It appears you do not have an account yet ❓
			</H1Styled>

			<div id="form__input-label">Enter an email address to sign up.</div>

			<form
				id="content__input-wrapper"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<Input
					type="email"
					autoComplete="off"
					placeholder="your@email.com"
					{...register("email", {
						required: true,
						setValueAs: (value: string) => value.toLowerCase(),
					})}
				/>

				<button type="submit">Sign up</button>

				<input
					type="hidden"
					// readOnly={true}
					{...register("public_address", {
						disabled: true,
					})}
				/>
			</form>

			{errors.email && errors.email.message ? (
				<ErrorInputStyled>{errors.email.message}</ErrorInputStyled>
			) : null}

			<LineBreakStyled />

			<div id="form__wallet-wrapper">
				<div>You are signing up as :</div>

				<div id="form__wallet-address">
					<WalletIcon />

					<div>
						{wallet.connectedAddress || "Wallet not connected"}
					</div>
				</div>
			</div>
		</Container>
	);
}

export default SignUpForm;
