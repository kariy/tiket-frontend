import { MouseEventHandler, useCallback } from "react";
import styled from "styled-components";

import EthereumColoredSVG from "../../../assets/svg/ethereum-colored.svg";
import { useEthereum } from "providers/EthereumProvider";
import { useWallet } from "providers/WalletProvider";
import { UserAPI } from "@lib/apis";
import Cookies from "js-cookie";
import { USER_SESSION_TOKEN } from "@lib/constants";
import { useUser } from "providers/UserProvider";

const ButtonText = styled.div`
	flex: 1;
	text-align: center;
`;

const ButtonIcon = styled.div`
	display: flex;

	margin: 0 0.3rem;
`;

const Button = styled.button`
	height: 34px;
	display: flex;
	align-items: center;

	/* width: 100%; */

	cursor: pointer;
	font-weight: 600;
	font-size: 0.8rem;
	padding: 0.7em 1.5em;
	transition: background-color 50ms ease-in;

	color: ${({ theme }) => theme.colors.black};
	border-radius: ${({ theme }) => theme.rounded.sm};
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid ${({ theme }) => theme.colors.grey.dark};

	&:hover {
		color: ${({ theme }) => theme.colors.white};
		background-color: ${({ theme }) => theme.colors.black};
	}
`;

const EthereumColoredIcon = styled(EthereumColoredSVG)`
	height: 16px;
`;

type TUserAuthButtonProps = {
	text: string;
	icon?: React.ComponentType;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
};

const UserAuthButton = ({
	onClick,
	text,
	icon: Icon,
	className,
}: TUserAuthButtonProps) => {
	return (
		<Button onClick={onClick} className={className}>
			{Icon ? (
				<ButtonIcon>
					<Icon />
				</ButtonIcon>
			) : null}

			<ButtonText>{text}</ButtonText>
		</Button>
	);
};

const DisconnectWalletStyled = styled(UserAuthButton)`
	border: none;
	background-color: ${({ theme }) => theme.colors.grey.light};
	transition: none;

	&&:hover {
		color: initial;
		background-color: initial;
	}
`;

export const SIWEButton = () => {
	const user = useUser();

	const handleClick = useCallback(() => {
		user.signIn();
	}, [user]);

	return (
		<UserAuthButton
			text="Sign in with Ethereum"
			icon={EthereumColoredIcon}
			onClick={handleClick}
		/>
	);
};

export const SignOutButton = () => {
	const user = useUser();

	const handleClick = useCallback(() => {
		user.signOut();
	}, [user]);

	return <UserAuthButton text="Sign out" onClick={handleClick} />;
};

export const ConnectWalletButton = () => {
	const wallet = useWallet();

	const handleClick = useCallback(() => {
		wallet.connect();
	}, [wallet]);

	return <UserAuthButton text="Connect wallet" onClick={handleClick} />;
};

export const DisconnectWalletButton = () => {
	const wallet = useWallet();

	const handleClick = useCallback(() => {
		wallet.disconnect();
	}, [wallet]);

	return <DisconnectWalletStyled text="Disconnect" onClick={handleClick} />;
};
