import styled, { keyframes } from "styled-components";

const moveBackForth = keyframes`
    0% {
		width: 30%;
        margin-left: 0;
    }

	50% {
		width: 45%
	}

    100% {
		width: 30%;
        margin-left: 100%;
        transform: translateX(-100%);
    }
`;

const Loader = styled.div`
	position: absolute;
	height: 100%;
	/* width: 40%; */
	background: ${({ theme }) => theme.colors.primary.light};
	border-radius: 50px;

	animation: ${moveBackForth} 1500ms ease-in-out infinite alternate;
`;

const Bar = styled.div<{ show?: boolean }>`
	display: ${({ show }) => (show ? "block" : "none")};

	position: relative;
	overflow: hidden;
	border-radius: 50px;

	height: 5px;
	width: 150px;
	background: ${({ theme }) => theme.colors.grey.medium};
`;

type TLoaderProps = {
	show?: boolean;
	className?: string;
};

function BarLoader({ show = true, className }: TLoaderProps) {
	return (
		<Bar className={className} show={show}>
			<Loader></Loader>
		</Bar>
	);
}

export default BarLoader;
