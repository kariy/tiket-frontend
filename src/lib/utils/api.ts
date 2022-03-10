import { ethers } from "ethers";
import { serialize } from "cookie";
import { NextApiResponse } from "next/types";

import { USER_SESSION_KEY } from "@lib/constants/key";

// get the keccak256 hash of "address + secret"
export const createPasswordHash = (address: string) => {
	return ethers.utils.id(address + process.env.USER_PWD_HASH_SECRET);
};

export const setSessionCookie = (res: NextApiResponse, value: any) => {
	const valueStr = JSON.stringify(value);

	res.setHeader(
		"Set-Cookie",
		serialize(USER_SESSION_KEY, valueStr, {
			path: "/",
		})
	);

	return;
};
