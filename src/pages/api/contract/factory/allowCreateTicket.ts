import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next/types";
import {
	arrayify,
	concat,
	isAddress,
	keccak256,
	toUtf8Bytes,
} from "ethers/lib/utils";

// Public Address : 0x73f8a075b9a1e3ddd169cfdbdfa513c40b8bd796
const signer = new ethers.Wallet(process.env.TIKET_FACTORY_OWNER_PRIVATE_KEY);

type ResponseData = {};

export type TCreateTicketSignatureData = {
	from: string;
	to: string;
	name: string;
	ticketDetails: string;
};

/**
 *
 * @TODO
 * check session token if valid
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== "POST")
		return res.status(405).send({ message: "WRONG_HTTP_METHOD" });

	// ticketDetails is expected to be of type string
	const { from, to, name, ticketDetails } = req.body;

	if (!from || !to || !name || !ticketDetails)
		return res
			.status(422)
			.send({ message: "INCOMPLETE_INFORMATION_FOR_SIGNATURE" });

	if (!isAddress(from))
		return res.status(422).send({ message: "FROM_INVALID_ADDRESS_FORMAT" });
	if (!isAddress(to))
		return res.status(422).send({ message: "TO_INVALID_ADDRESS_FORMAT" });

	try {
		const message = keccak256(
			concat([
				arrayify(from),
				arrayify(to),
				toUtf8Bytes(name),
				toUtf8Bytes(ticketDetails),
			])
		);

		const signature = await signer.signMessage(arrayify(message));

		return res.status(200).send(signature);
	} catch (e) {
		return res.status(500).send({ e });
	}
}
