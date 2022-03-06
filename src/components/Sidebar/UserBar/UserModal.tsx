import styled, { css } from "styled-components";

import { MEDIA_DIMENSIONS } from "@lib/constants/media";

import {
	ConnectWalletButton,
	DisconnectWalletButton,
	SignOutButton,
	SIWEButton,
} from "./buttons";

const ConnectedAddress = styled.div<{ isConnected: boolean }>`
	display: flex;
	align-items: center;
	align-self: stretch;

	& > div {
		width: 150px;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	#connected-address__disconnect {
		display: none;
		font-weight: 600;
	}

	${({ isConnected, theme }) => {
		if (isConnected)
			return css`
				cursor: pointer;
				border-radius: ${theme.rounded.sm};

				&:hover {
					background-color: ${({ theme }) => theme.colors.grey.light};

					#connected-address__address {
						display: none;
					}

					#connected-address__disconnect {
						display: flex;
						flex-direction: column;
					}
				}
			`;
	}}
`;

const UpperWrapper = styled.div<{ show: boolean }>`
	padding: 1.3em;
	background-color: ${({ theme }) => theme.colors.white};
	display: ${({ show }) => (show ? "block" : "none")};

	#upper-wrapper__title {
		font-weight: 600;
		margin-bottom: 13px;
	}

	#upper-wrapper__wallet {
		display: grid;
		grid-template-columns: 35px 1fr;
		align-items: center;
		column-gap: 10px;
	}

	#wallet__logo {
		width: 35px;
		height: 35px;
		border-radius: ${({ theme }) => theme.rounded.sm};
		border: 1px solid ${({ theme }) => theme.colors.grey.dark};

		background-position: center;
		background-repeat: no-repeat;
		background-image: url("./connected-wallet-default-image.png");
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;

	padding: 1em 1.3em;

	background-color: ${({ theme }) => theme.colors.grey.light};
	outline: 1px solid ${({ theme }) => theme.colors.grey.dark};
`;

const Container = styled.div<{ show: boolean }>`
	${({ show, theme }) => css`
		opacity: ${show ? "100%" : "0"};
		visibility: ${show ? "visible" : "hidden"};

		font-size: 0.8rem;
		/* min-height: 100px; */

		z-index: 2;
		position: absolute;
		bottom: ${show ? "130%" : "110%"};

		overflow: hidden;
		box-shadow: 0 6px 10px #86868665;
		border-radius: ${theme.rounded.md};
		background-color: ${theme.colors.white};
		outline: 1px solid ${theme.colors.grey.dark};

		transition: opacity 150ms ease-in-out, bottom 200ms ease-in-out;

		@media only screen and (max-width: ${MEDIA_DIMENSIONS.SMALL}) {
			width: 15.5rem;
		}

		@media only screen and (min-width: ${MEDIA_DIMENSIONS.SMALL}) {
			width: 115%;
		}
	`}
`;

type TUserModalProps = {
	show: boolean;
	isSignedIn: boolean;
	walletAddress: string | null;
};

function UserModal({ show, walletAddress, isSignedIn }: TUserModalProps) {
	const WhichSignButton = isSignedIn ? SignOutButton : SIWEButton;
	const isWalletConnected = !!walletAddress;

	return (
		<Container show={show}>
			<UpperWrapper show={isWalletConnected}>
				<div id="upper-wrapper__title">Your wallet</div>

				<div id="upper-wrapper__wallet">
					<div id="wallet__logo"></div>
					<ConnectedAddress isConnected={isWalletConnected}>
						<div id="connected-address__address">
							{walletAddress || "Wallet not connected"}
						</div>

						<div id="connected-address__disconnect">
							<DisconnectWalletButton />
						</div>
					</ConnectedAddress>
				</div>
			</UpperWrapper>

			<BottomWrapper>
				{isWalletConnected ? (
					<WhichSignButton />
				) : (
					<ConnectWalletButton />
				)}
			</BottomWrapper>
		</Container>
	);
}

export default UserModal;
