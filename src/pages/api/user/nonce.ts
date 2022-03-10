// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { serialize } from "cookie";
import { generateNonce } from "siwe";

import { SIWE_NONCE_KEY } from "@lib/constants";

type ResponseData = string;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const nonce = generateNonce();

	res.setHeader("Content-Type", "text/plain");
	res.setHeader(
		"Set-Cookie",
		serialize(SIWE_NONCE_KEY, nonce, {
			path: "/",
		})
	);

	res.status(200).send(nonce);
}
