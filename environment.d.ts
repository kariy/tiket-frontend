namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		ETH_NET: string;
		JWT_SECRET: string;
		SERVER_URL: string;

		INFURA_PROJECT_ID: string;
		INFURA_PROJECT_SECRET: string;

		SUPABASE_API_URL: string;
		SUPABASE_SERVICE_KEY: string;
		USER_PWD_HASH_SECRET: string;
	}
}
