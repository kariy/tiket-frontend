import { useWalletModal } from "./useWalletModal";
import { useCreateTicketForm } from "./useCreateTicketForm";

import { useUser } from "../../providers/UserProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { useWallet } from "../../providers/WalletProvider";
import { useEthereum } from "../../providers/EthereumProvider";

import { useSidebar, useSignUpModal, useUserModal } from "../../states/Toggle";

export {
	// State hooks
	useSidebar,
	useUserModal,
	useSignUpModal,
	// Provider hooks
	useUser,
	useTheme,
	useWallet,
	useEthereum,
	// Others
	useWalletModal as useWeb3WalletModal,
	useCreateTicketForm,
};
