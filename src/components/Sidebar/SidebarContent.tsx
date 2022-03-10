import React from "react";
import styled from "styled-components";

import UserBar from "./UserBar";
import NavLink from "./NavLink";
import { BoxContainerStyled } from "../Styled";
import { MEDIA_DIMENSIONS } from "@lib/constants/media";

// icons
import HomeSVG from "../../assets/svg/home.svg";
import FolderSVG from "../../assets/svg/folder.svg";
import SearchSVG from "../../assets/svg/search.svg";
import TicketSVG from "../../assets/svg/ticket.svg";

const NavItem = styled.div`
	margin: 0.4rem 0;
	overflow: hidden;
	user-select: none;
	color: ${(props) => props.theme.colors.black};
	border-radius: ${(props) => props.theme.rounded.md};

	.sidebar-nav-link {
		display: flex;
		align-items: center;
		justify-content: space-around;

		padding: 0.7em;
		text-decoration: none;
		color: ${(props) => props.theme.colors.black};

		div {
			flex: 1;
		}
	}

	.sidebar-nav-link:hover {
		background-color: ${(props) => props.theme.colors.grey.medium};
	}

	.sidebar-nav-link--active {
		background-color: ${({ theme }) => theme.colors.grey.medium};
	}

	svg {
		height: 1.8em;

		transition: height 150ms ease-in-out;
	}

	.nav-item__text {
		font-weight: 500;
		margin-left: 15px;
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.COMPACT}) and (max-width: ${MEDIA_DIMENSIONS.SMALL}) {
		.nav-item__text {
			display: none;
		}
	}

	@media only screen and (max-width: ${MEDIA_DIMENSIONS.COMPACT}),
		(min-width: ${MEDIA_DIMENSIONS.SMALL}) {
		align-self: stretch;

		.nav-item__text {
			display: block;
		}

		.sidebar-nav-link {
			padding-left: 1.3em;
			padding-right: 1.3em;
		}

		svg {
			height: 1.5em;
		}
	}
`;

const Nav = styled.nav`
	/* outline: 1px solid green; */
	display: flex;
	align-items: stretch;
	flex-direction: column;
`;

const Container = styled(BoxContainerStyled)<{ show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${(props) => props.theme.colors.white};

	@media only screen and (max-width: ${MEDIA_DIMENSIONS.COMPACT}) {
		display: ${({ show }) => (show ? "block" : "none")};
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.COMPACT}) and (max-width: ${MEDIA_DIMENSIONS.SMALL}) {
		padding: 2rem 0.5em;
	}

	@media only screen and (max-width: ${MEDIA_DIMENSIONS.COMPACT}),
		(min-width: ${MEDIA_DIMENSIONS.SMALL}) {
		padding: 3em 1.4rem;
	}
`;

type Props = {
	show: boolean;
	isSignedIn: boolean;
};

class SidebarContent extends React.PureComponent<Props> {
	render() {
		const { show, isSignedIn } = this.props;

		return (
			<Container show={show}>
				<Nav>
					<NavItem>
						<NavLink
							href="/"
							className="sidebar-nav-link"
							activeClass="sidebar-nav-link--active"
						>
							<HomeSVG />
							<div className="nav-item__text">Home</div>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							href="/ticket/search"
							className="sidebar-nav-link"
							activeClass="sidebar-nav-link--active"
						>
							<SearchSVG />
							<div className="nav-item__text">Search Ticket</div>
						</NavLink>
					</NavItem>

					{isSignedIn ? (
						<>
							<NavItem>
								<NavLink
									href="/ticket/create"
									className="sidebar-nav-link"
									activeClass="sidebar-nav-link--active"
								>
									<TicketSVG />
									<div className="nav-item__text">
										Create Ticket
									</div>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									href="/collections"
									className="sidebar-nav-link"
									activeClass="sidebar-nav-link--active"
								>
									<FolderSVG />
									<div className="nav-item__text">
										Your Tickets
									</div>
								</NavLink>
							</NavItem>
						</>
					) : null}
				</Nav>
				<UserBar />
			</Container>
		);
	}
}

export default SidebarContent;
