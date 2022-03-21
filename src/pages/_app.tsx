import React from "react";
import "../styles/globals.css";
import styled, { useTheme } from "styled-components";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import Providers from "providers";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { MaxContainerStyled } from "@components/Styled";
import SignUpModal, { SignUpModalStyles } from "@components/SignUpModal";

import { MEDIA_DIMENSIONS } from "@lib/constants/media";

const MainSiteContainer = styled(MaxContainerStyled)`
	flex: 1;
	padding-bottom: 3rem;
	min-height: min-content;

	#main-content-grid {
		display: grid;

		flex: 1;
		height: 100%;
		column-gap: 1.3rem;
		min-height: min-content;
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.COMPACT}) {
		#main-content-grid {
			grid-template-columns: 75px 1fr;
		}
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.SMALL}) {
		#main-content-grid {
			grid-template-columns: 250px minmax(400px, 1fr);
		}
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.MEDIUM}) {
		#main-content-grid {
			grid-template-areas: "left-wing center right-wing";
			grid-template-columns: 250px minmax(400px, 1fr) 250px;
		}

		#main-page-container {
			grid-area: center;
		}
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	height: 100%;
`;

const Container = styled.div`
	height: 100vh;

	min-height: 700px;

	${SignUpModalStyles}
`;

function App({ Component, pageProps }: AppProps) {
	const theme = useTheme();

	return (
		<Container id="app-main-container">
			<Wrapper>
				<SignUpModal />
				<Navbar />
				<MainSiteContainer>
					<div id="main-content-grid">
						<Sidebar />
						<div id="main-page-container">
							<NextNProgress
								color={theme.colors.primary.medium}
							/>
							<Component {...pageProps} />
						</div>
					</div>
				</MainSiteContainer>
			</Wrapper>
		</Container>
	);
}

function AppWithProviders(props: AppProps) {
	return (
		<Providers>
			<App {...props} />
		</Providers>
	);
}

export default AppWithProviders;
