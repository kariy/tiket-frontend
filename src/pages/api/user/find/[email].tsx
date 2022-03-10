// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_API_URL,
	process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email } = req.query;

	if (!email)
		return res.status(422).send({ message: "EMAIL_EXPECTED_IN_BODY" });

	try {
		const { data: users, error } = await supabase
			.from("users")
			.select("id, public_address")
			.eq("email", email);

		if (error) throw error;

		return res.status(200).json({ users });
	} catch (e) {
		return res.status(500).send(e);
	}
}
