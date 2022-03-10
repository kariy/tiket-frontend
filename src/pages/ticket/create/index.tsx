import Head from "next/head";
import styled from "styled-components";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";

import { getTabTitle } from "@lib/utils";
import { getAuthServerSideProps, WithAuth } from "@lib/auth/page";

import MainPage from "@components/MainPage";
import CreateTicketForm from "@components/Ticket/Create";

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

function CreateTicket() {
	return (
		<Fragment>
			<Head>
				<title>{getTabTitle("Create a ticket")}</title>
			</Head>
			<MainPage>
				{({ Title, LineBreak }) => (
					<Wrapper>
						<div>
							<Title>Create new ticket</Title>
							<LineBreak />
						</div>
						<CreateTicketForm />
					</Wrapper>
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
