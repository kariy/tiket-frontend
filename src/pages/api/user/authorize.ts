// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { USER_SESSION_KEY } from "@lib/constants";

import { createClient, Session as TSBSession } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_API_URL,
	process.env.SUPABASE_SERVICE_KEY
);

type ResponseData = {};

/**
 *
 * This endpoint is for authorizing user.
 * A session token is attached in the request as a cookie
 * Find the user associated with the token using session.access_token,
 */

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const token = req.cookies[USER_SESSION_KEY];

	if (!token)
		return res.status(422).send({ message: "SESSION_TOKEN_MISSING" });

	const session: TSBSession = JSON.parse(req.cookies[USER_SESSION_KEY]);

	if (!session.access_token)
		return res
			.status(422)
			.send({ message: "SESSION_ACCESS_TOKEN_MISSING" });

	const { user, error: authError } = await supabase.auth.api.getUser(
		session.access_token
	);

	if (!user || authError)
		return res
			.status(401)
			.send({ message: "UNAUTHORIZED", error: authError });

	// checks if user has activated their account
	if (!user.confirmed_at)
		return res.status(403).send({ message: "USER_NOT_CONFIRMED" });

	const { data, error: queryError } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id);

	if (!data || queryError)
		return res
			.status(404)
			.send({ message: "USER_NOT_FOUND", error: queryError });

	return res.status(200).send({ user: data[0] });
}
