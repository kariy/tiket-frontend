// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { SiweMessage } from "siwe";
import { createClient } from "@supabase/supabase-js";

import { SIWE_NONCE_KEY } from "@lib/constants";
import { createPasswordHash, setSessionCookie } from "@lib/utils/api";

const supabase = createClient(
	process.env.SUPABASE_API_URL,
	process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (!req.body.message)
		return res.status(422).send({ message: "SIWE_MESSAGE_EXPECTED" });
	if (!req.body.signature)
		return res.status(422).send({ message: "SIWE_SIGNATURE_EXPECTED" });

	try {
		const nonce = req.cookies[SIWE_NONCE_KEY];
		const message = new SiweMessage(req.body.message);
		const fields = await message.validate(req.body.signature);

		if (!nonce)
			return res.status(422).send({ message: "SIWE_NONCE_MISSING" });

		if (fields.nonce !== nonce)
			return res.status(422).send({ message: "SIWE_NONCE_INVALID" });

		const { data: users, error: userQueryError } = await supabase
			.from("users")
			.select("*")
			.eq("public_address", fields.address);

		if (userQueryError) throw userQueryError;

		if (!users || !users.length)
			return res
				.status(401)
				.send({ message: "USER_DOES_NOT_EXIST", code: 3200 });

		const userEmail = users[0].email;
		const userPwd = createPasswordHash(users[0].public_address);
		console.log("session");

		const { data: session, error: signInError } =
			await supabase.auth.api.signInWithEmail(userEmail, userPwd);

		if (!session || signInError) throw signInError;

		// console.log("session", session);
		setSessionCookie(res, session);

		return res.status(200).json({ user: users[0] });
	} catch (err: any) {
		return res.status(500).send(err);
	}
}
