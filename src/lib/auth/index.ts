import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const createJWT = (payload: string | object | Buffer) =>
	jwt.sign(payload, SECRET_KEY, {
		expiresIn: "7d",
	});

export const verifyJWT = (token: string) => jwt.verify(token, SECRET_KEY);
