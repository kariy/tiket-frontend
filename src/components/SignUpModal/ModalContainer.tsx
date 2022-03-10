import { useSignUpModal } from "@lib/hooks";

import Modal from "./Modal";

function ModalContainer() {
	const modal = useSignUpModal();

	const handleClose = () => modal.close();

	return <Modal show={modal.state} handleClose={handleClose} />;
}

export default ModalContainer;
