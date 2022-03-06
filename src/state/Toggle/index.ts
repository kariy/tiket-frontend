import { useSelector } from "react-redux";

import { RootState } from "state";
import { getDispatchers } from "./actions";
import { AppToggleableEnum } from "./slice";

const dispatchSidebar = getDispatchers(AppToggleableEnum.SIDEBAR);

const dispatchUserModal = getDispatchers(AppToggleableEnum.USER_MODAL);

export const useSidebar = () => {
	const sidebar = useSelector((state: RootState) => state.toggleable.SIDEBAR);

	return {
		state: sidebar,
		...dispatchSidebar,
	};
};

export const useUserModal = () => {
	const userModal = useSelector(
		(state: RootState) => state.toggleable.USER_MODAL
	);

	return {
		state: userModal,
		...dispatchUserModal,
	};
};
