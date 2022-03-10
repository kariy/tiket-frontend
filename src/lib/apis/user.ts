import Cookies from "js-cookie";
import { JsonRpcSigner } from "@ethersproject/providers";

import { prepareSignInSIWE } from "@lib/utils";
import { SIWE_NONCE_KEY, USER_SESSION_KEY } from "@lib/constants/key";
import axios from "axios";
import { Session } from "@supabase/supabase-js";

/**
 *
 * TYPES
 *
 */

type TSignInParams = {
	message: string;
	signature: string;
};

export type TUserSignUpData = {
	email: string;
	public_address: string;
};

export type TUserData = {
	id: string;
	email: string;
	public_address: string;
};

/**
 *
 * FUNCTIONS
 *
 */

export const signIn = async (signer: JsonRpcSigner) => {
	const address = await signer.getAddress();
	const { message, nonce } = await prepareSignInSIWE(address);
	const signature = await signer.signMessage(message);

	const data = { nonce, message, signature };

	return axios.post(`/api/user/method/signIn`, data);
};

export const signOut = () => {
	deleteAuthCookies();
	window.location.reload();
};

export const signUp = async (data: TUserSignUpData) =>
	axios.post("api/user/method/signUp", data);

export const authorize = () => axios.get(`/api/user/authorize`);

export const getSignInNonce = async () =>
	fetch(`/api/user/nonce`).then((res) => res.text());

export const deleteAuthCookies = () => {
	Cookies.remove(SIWE_NONCE_KEY);
	Cookies.remove(USER_SESSION_KEY);
};

/**
 *
 * DATABASE QUERY
 *
 */

export const findEmail = async (email: string) =>
	axios.get<{ users: any[] }>(`/api/user/find/${email}`);

export const checkIfEmailExist = async (email: string) => {
	const { data } = await findEmail(email);
	return data.users.length ? true : false;
};
