import { NextApiRequest, NextApiResponse } from "next/types";
import { createClient, User as TSBUser } from "@supabase/supabase-js";

import { createPasswordHash } from "@lib/utils/api";

const supabase = createClient(
	process.env.SUPABASE_API_URL,
	process.env.SUPABASE_SERVICE_KEY
);

type ResponseData = {};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== "POST")
		return res.status(405).send({ message: "WRONG_HTTP_METHOD" });

	const { email, public_address } = req.body;

	if (!email)
		return res.status(422).send({ message: "EMAIL_MISSING_IN_BODY" });
	if (!public_address)
		return res
			.status(422)
			.send({ message: "PUBLIC_ADDRESS_MISSING_IN_BODY" });

	try {
		const userDB = supabase.from("users");

		const newUser = await userDB.insert({
			email,
			public_address,
		});

		if (newUser.error) throw newUser.error;

		const password = createPasswordHash(public_address);
		const signUp = await supabase.auth.api.signUpWithEmail(email, password);

		if (signUp.error) throw signUp.error;

		const user = signUp.data as TSBUser;

		const updateRes = await userDB
			.update({ id: user.id })
			.eq("email", user.email);

		if (updateRes.error) throw updateRes.error;

		return res.status(200).send({ user: updateRes.data[0] });
	} catch (err: any) {
		return res.status(500).send(err);
	}
}
