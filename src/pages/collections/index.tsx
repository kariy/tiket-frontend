import Head from "next/head";
import { NextPage } from "next";
import { Fragment } from "react";

import { getTabTitle } from "@lib/utils";
import MainPage from "@components/MainPage";
import YourTicketCollection from "@components/YourCollection";

const YourCollectionPage: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>{getTabTitle("Ticket Collection")}</title>
			</Head>
			<MainPage>
				{({ Title, LineBreak, Header }) => (
					<>
						<Header>
							<Title>Your ticket collection</Title>
							<LineBreak />
						</Header>
						<YourTicketCollection />
					</>
				)}
			</MainPage>
		</Fragment>
	);
};

export default YourCollectionPage;
