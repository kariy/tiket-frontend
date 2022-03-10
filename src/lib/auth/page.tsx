import { GetServerSideProps, NextPage } from "next";

import Redirect from "@components/Redirect";

import { USER_SESSION_KEY } from "../constants";

import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { api } from "@lib/apis";

type TProps = {
	isAuthorized: boolean;
};

type TProtectedPage<Props = {}> = (
	Component: React.ComponentType
) => NextPage<Props>;

export const WithAuth: TProtectedPage<TProps> = function (Component) {
	const ProtectedComponent: NextPage<TProps> = ({ isAuthorized }) => {
		return isAuthorized ? <Component /> : <Redirect to="/" />;
	};

	return ProtectedComponent;
};

type TGetAuthServerSideProps = (
	fetchFunction?: GetServerSideProps
) => GetServerSideProps;

export const getAuthServerSideProps: TGetAuthServerSideProps = function (
	fetchFunction
) {
	return async (ctx) => {
		const { req } = ctx;
		const session = req.cookies[USER_SESSION_KEY];

		const { status } = await axios.get(
			"http://localhost:3000/api/user/authorize",
			{
				headers: {
					Cookie: `${USER_SESSION_KEY}=${session}`,
				},
				validateStatus: null,
			}
		);

		const isAuthorized = status === 200 ? true : false;

		if (!fetchFunction)
			return {
				props: {
					isAuthorized,
				},
			};

		const fetchResult = await fetchFunction(ctx);

		// @ts-ignore
		if (fetchResult.props && Object.keys(fetchResult.props).length)
			return {
				props: {
					isAuthorized,
					// @ts-ignore
					...fetchResult.props,
				},
			};
		else
			return {
				props: {
					isAuthorized,
				},
			};
	};
};
