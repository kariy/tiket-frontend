import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { Fragment } from "react";
import styled from "styled-components";

import { getTabTitle } from "@lib/utils";
import { MEDIA_CONSTANTS } from "@lib/constants";

import MainPage from "@components/MainPage";

const ContentWrapper = styled.div`
	.text--block {
		display: block;
		margin: 0.6rem 0;
	}
`;

const Home: NextPage = () => {
	const handleClick = async () => {};
	return (
		<Fragment>
			<Head>
				<title>{getTabTitle("Homepage")}</title>
			</Head>
			<MainPage>
				{({ Title, LineBreak }) => (
					<ContentWrapper>
						<Title>
							<span className="text--block">Welcome to</span>
							<span className="text--block">
								{MEDIA_CONSTANTS.APP_TITLE}.
							</span>
						</Title>
						<LineBreak />
						{/* <button onClick={handleClick}>button</button> */}
					</ContentWrapper>
				)}
			</MainPage>
		</Fragment>
	);
};

export default Home;
