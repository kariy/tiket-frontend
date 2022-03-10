import { api } from "@lib/apis";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

export function checkWeb3() {
	return typeof window.ethereum == "undefined" ? false : true;
}

export function web3() {
	return new ethers.providers.Web3Provider(window.ethereum);
}

export const createSIWEMessage = async (address: string) => {
	const nonce = await api.user.getSignInNonce();
	const message = new SiweMessage({
		domain: window.location.host,
		address,
		statement: "Sign in with Ethereum to the tiket app.",
		uri: window.location.origin,
		version: "1",
		chainId: 1,
		nonce,
	});

	return message;
};

export const prepareSignInSIWE = async (address: string) => {
	const message = await createSIWEMessage(address);

	return { message: message.prepareMessage(), nonce: message.nonce };
};
