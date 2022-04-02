import Head from "next/head";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";

import { getTabTitle } from "@lib/utils";
import { getAuthServerSideProps, WithAuth } from "@lib/auth/page";

import MainPage from "@components/MainPage";
import CreateTicketForm from "@components/Ticket/Create";

function CreateTicket() {
	return (
		<Fragment>
			<Head>
				<title>{getTabTitle("Create a ticket")}</title>
			</Head>
			<MainPage>
				{({ Title, LineBreak, Header }) => (
					<>
						<Header>
							<Title>Create new ticket</Title>
							<LineBreak />
						</Header>
						<CreateTicketForm />
					</>
				)}
			</MainPage>
		</Fragment>
	);
}

const fetchServerSideData: GetServerSideProps = async (ctx) => {
	return {
		props: {
			name: "kari",
		},
	};
};

export const getServerSideProps: GetServerSideProps =
	getAuthServerSideProps(fetchServerSideData);

export default WithAuth(CreateTicket);
