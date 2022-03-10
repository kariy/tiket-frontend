import styled from "styled-components";

import { useSidebar } from "states/Toggle";
import { MaxContainerStyled } from "./Styled";

import LogoSVG from "../assets/svg/logo.svg";
import CrossSVG from "../assets/svg/cross.svg";
import HamburgerMenuSVG from "../assets/svg/hamburger-menu.svg";

const Logo = styled(LogoSVG)`
	display: block;
	margin: 0 auto;
	height: 1.3rem;
	align-self: center;
	/* color: ${({ theme }) => theme.colors.primary.medium}; */
`;

const Container = styled(MaxContainerStyled)`
	position: sticky;
	top: 0;
	left: 0;
	right: 0;

	/* outline: 1px solid green; */
	/* position: relative; */
	display: grid;
	padding: 1.5rem 0;
	background-color: white;
	grid-template-columns: minmax(40px, 1fr) 5fr minmax(40px, 1fr);

	#sidebar-menu-button {
		z-index: 1000;

		width: 40px;
		height: 40px;

		display: flex;
		cursor: pointer;
		align-items: center;
		border-radius: 1000px;
		justify-content: center;
		box-shadow: ${(props) => props.theme.shadow.sm};
		background-color: ${(props) => props.theme.colors.white};
		border: 1px solid ${(props) => props.theme.colors.grey.medium};
	}

	#sidebar-menu-button > svg {
		color: ${(props) => props.theme.colors.black};
		width: 17px;
	}

	@media only screen and (min-width: 600px) {
		position: static;
		display: flex;
		min-height: 65px;
		margin-top: unset;
		align-items: center;
		margin-bottom: 2.5rem;
		border-bottom: 1px solid ${(props) => props.theme.colors.grey.medium};

		#sidebar-menu-button {
			display: none;
		}

		${Logo} {
			margin: 0;
			height: 1.5rem;
		}
	}
`;

function Navbar() {
	const sidebar = useSidebar();

	const handleClickMenu = () => sidebar.toggle();

	return (
		<Container>
			<div id="sidebar-menu-button" onClick={handleClickMenu}>
				{sidebar.state ? <CrossSVG /> : <HamburgerMenuSVG />}
			</div>
			<Logo />
		</Container>
	);
}

export default Navbar;
