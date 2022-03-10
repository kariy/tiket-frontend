import { NextApiRequest, NextApiResponse } from "next/types";
import { createClient } from "@supabase/supabase-js";
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
	const { email, public_address } = req.body;

	try {
		const password = createPasswordHash(public_address);
		const { error } = await supabase.auth.api.signUpWithEmail(
			email,
			password
		);

		if (error) throw error;

		return res.status(200).send({});
	} catch (err) {
		// @ts-ignore
		return res.status(500).send(err);
	}
}
