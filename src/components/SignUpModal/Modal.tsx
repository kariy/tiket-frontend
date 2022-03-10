import ReactModal from "react-modal";
import styled, { css } from "styled-components";

import SignUpFormContainer from "./SignUpFormContainer";
import { MEDIA_DIMENSIONS } from "@lib/constants/media";

import CloseSVG from "../../assets/svg/dot-close.svg";

const CloseIcon = styled(CloseSVG)`
	display: flex;
	width: 25px;

	.dot-close__cross {
		stroke: ${({ theme }) => theme.colors.white};
	}

	.dot-close__circle {
		fill: ${({ theme }) => theme.colors.primary.medium};
	}
`;

export const SignUpModalStyles = css`
	${({ theme }) => css`
		.sU-modal__content {
			opacity: 0;
			transform: scale(0.9);

			position: relative;

			margin: 0 auto;
			overflow: hidden;
			height: min-content;
			box-shadow: 0 4px 10px #0000004c;
			border-radius: ${theme.rounded.lg};
			background-color: ${theme.colors.white};
			outline: 1px solid ${theme.colors.grey.dark};

			transition: opacity 100ms ease-in-out, transform 150ms ease-in-out;

			@media only screen and (max-width: ${MEDIA_DIMENSIONS.COMPACT}) {
				width: 90%;
			}

			@media only screen and (min-width: ${MEDIA_DIMENSIONS.COMPACT}) {
				width: 80%;
			}

			@media only screen and (min-width: ${MEDIA_DIMENSIONS.SMALL}) {
				width: 600px;
			}
		}

		.sU-modal__content--afterOpen {
			opacity: 100%;
			transform: scale(1);
		}

		.sU-modal__content--beforeClose {
			opacity: 0;
			transform: scale(0.9);
		}

		.sU-modal__overlay {
			opacity: 0;
			display: flex;
			align-items: center;

			inset: 0px;
			z-index: 1000;
			position: fixed;

			backdrop-filter: blur(2px);
			background-color: rgba(255, 255, 255, 0.75);

			transition: opacity 150ms ease-in-out;
		}

		.sU-modal__overlay--beforeClose {
			opacity: 0;
		}

		.sU-modal__overlay--afterOpen {
			opacity: 100%;
		}

		#sU-modal__close-btn {
			z-index: 1;
			top: 1rem;
			left: 1rem;
			position: absolute;

			cursor: pointer;
			border-radius: 100px;
			/* outline: 1px solid green; */
		}
	`}
`;

const Container = styled.div`
	position: relative;

	padding: 4em 2.5em 2.5em 2.5em;
	min-height: 250px;
`;

type TSignUpModalProps = {
	show: boolean;
	handleClose: () => any;
};

function Modal({ show, handleClose }: TSignUpModalProps) {
	return (
		<ReactModal
			parentSelector={() =>
				document.getElementById("app-main-container") || document.body
			}
			isOpen={show}
			shouldCloseOnEsc={true}
			onRequestClose={handleClose}
			shouldCloseOnOverlayClick={false}
			className={{
				base: "sU-modal__content",
				afterOpen: "sU-modal__content--afterOpen",
				beforeClose: "sU-modal__content--beforeClose",
			}}
			overlayClassName={{
				base: "sU-modal__overlay",
				afterOpen: "sU-modal__overlay--afterOpen",
				beforeClose: "sU-modal__overlay--beforeClose",
			}}
			closeTimeoutMS={150}
		>
			<div id="sU-modal__close-btn" onClick={handleClose} tabIndex={0}>
				<CloseIcon />
			</div>

			<Container>
				<SignUpFormContainer />
			</Container>
		</ReactModal>
	);
}

export default Modal;
