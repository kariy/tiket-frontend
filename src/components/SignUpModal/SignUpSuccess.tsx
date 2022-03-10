import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

import { H1Styled } from "@components/Styled";
import { useWallet } from "providers/WalletProvider";

const Container = styled.div`
	${H1Styled} {
		margin-bottom: 2rem;
	}

	p {
		line-height: 130%;

		:last-of-type {
			margin-top: 3rem;
			font-size: 0.85rem;
		}

		#resend-email-text {
			cursor: pointer;
			font-style: italic;
			text-decoration: underline;

			:hover {
				color: ${({ theme }) => theme.colors.primary.light};
			}
		}
	}
`;

function SignUpSuccess() {
	const wallet = useWallet();
	const [timeoutTime, setTimeoutTime] = useState(0);
	const [isTimeout, setIsTimeout] = useState(false);

	useEffect(() => {
		if (timeoutTime === 0) setIsTimeout(false);
	}, [timeoutTime]);

	useEffect(() => {
		if (isTimeout) {
			setTimeoutTime(60);
			setInterval(() => setTimeoutTime((state) => state - 1), 1000);
		}
	}, [isTimeout]);

	const handleResendEmail = useCallback(async () => {
		axios
			.post("/api/user/resendActivationEmail", {
				email: "ammr.arf@gmail.com",
				public_address: wallet.connectedAddress,
			})
			.then(() => setIsTimeout(true))
			.catch((e) =>
				console.error("RESEND_ACTIVATION_EMAIL_FAILED", e.response)
			);
	}, [wallet.connectedAddress]);

	return (
		<Container>
			<H1Styled>Your account have been successfully created ✔️</H1Styled>
			<p>
				We have sent an activation email to your inbox. Please click the
				link in the email to activate your account.
			</p>
			<p>
				Didn&apos;t receive the email?{" "}
				{isTimeout ? (
					<span>Please wait for {timeoutTime} seconds</span>
				) : (
					<span onClick={handleResendEmail} id="resend-email-text">
						Click here to resend
					</span>
				)}
				.
			</p>
		</Container>
	);
}

export default SignUpSuccess;

// function useTimeout(ms: number, start?: boolean) {
// 	const [isTimeout, setIsTimeout] = useState(start);
// 	const [timeoutTime, setTimeoutTime] = useState(0);

// 	useEffect(() => {
// 		if (timeoutTime === 0) setIsTimeout(false);
// 	}, [timeoutTime]);

// 	useEffect(() => {
// 		if (isTimeout) {
// 			setTimeoutTime(ms);
// 			setInterval(() => setTimeoutTime((state) => state - 1), 1000);
// 		}
// 	}, [isTimeout, ms]);

// 	const reset = useCallback(() => {
// 		setIsTimeout(false);
// 		setTimeoutTime(0);
// 	}, []);

// 	return {
// 		isTimeout,
// 		timeoutTime,
// 		start: () => setIsTimeout(true),
// 		stop: () => setIsTimeout(false),
// 	};
// }
