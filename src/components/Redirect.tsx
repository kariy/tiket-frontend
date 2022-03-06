import { useRouter } from "next/router";
import { useEffect } from "react";

type TRedirectProps = {
	to: string;
};

function Redirect({ to }: TRedirectProps) {
	const router = useRouter();

	useEffect(() => {
		router.replace(to);
	}, [router, to]);

	return null;
}

export default Redirect;
