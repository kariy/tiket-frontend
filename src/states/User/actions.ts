import { store } from "..";
import { set, TCurrentUser } from "./slice";

export const setUser = (user: TCurrentUser) => store.dispatch(set(user));

export const removeUser = () => store.dispatch(set(null));
