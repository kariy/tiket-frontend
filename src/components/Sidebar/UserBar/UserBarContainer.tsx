import styled from "styled-components";

import UserBar from "./UserBar";
import UserModal from "./UserModal";

import { useUser, useUserModal, useWallet } from "@lib/hooks";

const LightBox = styled.div<{ show: boolean }>`
	inset: 0;
	z-index: 0;
	position: fixed;

	visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const Container = styled.div`
	position: relative;
`;

function UserBarContainer() {
	const user = useUser();
	const wallet = useWallet();
	const userModal = useUserModal();

	return (
		<Container>
			<LightBox
				show={userModal.state}
				onClick={() => userModal.close()}
			></LightBox>

			<UserModal
				show={userModal.state}
				isSignedIn={user.isSignedIn}
				walletAddress={wallet.connectedAddress}
			/>
			<UserBar signedInAddress={user.current?.address} />
		</Container>
	);
}

export default UserBarContainer;
