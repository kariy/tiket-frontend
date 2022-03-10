import styled from "styled-components";

import MenuSVG from "../../../assets/svg/dot-menu.svg";

import Profile2SVG from "../../../assets/svg/profile-2.svg";
import { MEDIA_DIMENSIONS } from "@lib/constants/media";
import { useUserModal } from "states/Toggle";

const MenuIcon = styled(MenuSVG)`
	height: 13px;
`;

const ProfileIcon = styled(Profile2SVG)`
	height: 15px;
	color: ${({ theme }) => theme.colors.black};

	transition: height 150ms ease-in-out;
`;

const MenuButton = styled.div`
	/* outline: 1px solid green; */

	display: flex;
	align-items: center;

	padding: 0.4em;
	border-radius: ${({ theme }) => theme.rounded.full};
`;

const User = styled.div`
	/* outline: 1px solid blue; */

	width: 85%;
	margin: 0 0.8rem;
	overflow: hidden;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Container = styled.div`
	cursor: pointer;
	font-size: 0.85rem;
	padding: 0.7em 0.9em;
	border-radius: ${({ theme }) => theme.rounded.md};
	border: 1px solid ${({ theme }) => theme.colors.grey.dark};

	&:hover {
		background-color: ${({ theme }) => theme.colors.grey.light};
	}

	@media only screen and (max-width: ${MEDIA_DIMENSIONS.SMALL}) {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;

		${User}, ${MenuButton} {
			display: none;
		}

		${ProfileIcon} {
			height: 20px;
		}
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.SMALL}) {
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: 1.5rem 1fr 1.2rem;
	}
`;

type TUserBarProps = {
	signedInAddress?: string;
};

function UserBar({ signedInAddress }: TUserBarProps) {
	const userModal = useUserModal();

	const handleClick = () => userModal.toggle();

	return (
		<Container onClick={handleClick}>
			<ProfileIcon />

			<User>{signedInAddress || "Not signed in"}</User>

			<MenuButton>
				<MenuIcon />
			</MenuButton>
		</Container>
	);
}

export default UserBar;
