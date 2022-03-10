import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import MainPage from "../components/MainPage";

const Container = styled.div`
	font-weight: 500;

	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function Custom404() {
	return (
		<Fragment>
			<Head>
				<title>Page not found</title>
			</Head>
			<MainPage>
				{(args) => <Container>404 - Page not found.</Container>}
			</MainPage>
		</Fragment>
	);
}

export default Custom404;
