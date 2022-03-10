import axios from "axios";
import * as user from "./user";

export const SERVER_URL = process.env.SERVER_URL;

export const { get, post } = axios.create({
	baseURL: "http://localhost:3000",
});

export const api = {
	user,
};
