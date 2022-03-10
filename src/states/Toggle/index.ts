import { useSelector } from "react-redux";

import { RootState } from "states";
import { getDispatchers } from "./actions";
import { AppToggleableEnum } from "./slice";

const dispatchSidebar = getDispatchers(AppToggleableEnum.SIDEBAR);

const dispatchUserModal = getDispatchers(AppToggleableEnum.USER_MODAL);

const dispatchSignUpModal = getDispatchers(AppToggleableEnum.SIGN_UP_MODAL);

export const useSidebar = () => {
	const sidebar = useSelector((state: RootState) => state.toggleable.SIDEBAR);

	return {
		state: sidebar,
		...dispatchSidebar,
	};
};

export const useUserModal = () => {
	const modal = useSelector(
		(state: RootState) => state.toggleable.USER_MODAL
	);

	return {
		state: modal,
		...dispatchUserModal,
	};
};

export const useSignUpModal = () => {
	const modal = useSelector(
		(state: RootState) => state.toggleable.SIGN_UP_MODAL
	);

	return {
		state: modal,
		...dispatchSignUpModal,
	};
};
