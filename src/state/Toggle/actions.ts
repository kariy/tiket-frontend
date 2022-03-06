import { store } from "state";
import { set, toggle, TTogglePayloadAction } from "./slice";

type TToggleableStateName = TTogglePayloadAction["name"];

const setToggleableState = (
	name: TTogglePayloadAction["name"],
	value: TTogglePayloadAction["value"]
) => store.dispatch(set({ name, value }));

const enableToggleable = (name: TToggleableStateName) => () =>
	setToggleableState(name, true);

const disableToggleable = (name: TToggleableStateName) => () =>
	setToggleableState(name, false);

const toggleToggleable = (name: TToggleableStateName) => () =>
	store.dispatch(toggle(name));

export const getDispatchers = (name: TToggleableStateName) => ({
	open: enableToggleable(name),
	close: disableToggleable(name),
	toggle: toggleToggleable(name),
});
