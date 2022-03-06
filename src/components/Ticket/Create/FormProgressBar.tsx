import styled from "styled-components";
import { FormStageEnum } from "../../../lib/types/form";

import CheckmarkSVG from "../../../assets/svg/checkmark.svg";

const Container = styled.div`
	margin-bottom: 10px;

	#progress_bar_text_container {
		display: flex;
		margin-bottom: 7px;
		color: ${({ theme }) => theme.colors.primary.medium};
	}

	.progress_bar_text {
		flex: 1;
		font-weight: 500;
		font-size: 0.8rem;
	}

	svg {
		margin-left: 5px;
	}
`;

const ProgressBarContainer = styled.div`
	height: 9px;
	border-radius: ${({ theme }) => theme.rounded.full};
	border: 1px solid ${({ theme }) => theme.colors.primary.light};
`;

const ProgressBar = styled.div<{ stage: FormStageEnum }>`
	height: 100%;
	transition: width 150ms ease-in-out;
	width: calc((${({ stage }) => stage} / 3) * 100%);
	border-radius: ${({ theme }) => theme.rounded.full};
	background-color: ${({ theme }) => theme.colors.primary.light};
`;

interface IFormProgressBarProps {
	stage: FormStageEnum;
}

function FormProgressBar({ stage }: IFormProgressBarProps) {
	return (
		<Container>
			<div id="progress_bar_text_container">
				<div className="progress_bar_text">
					1. Event details
					{!(stage > FormStageEnum.EVENT_DETAIL) || <CheckmarkSVG />}
				</div>

				<div className="progress_bar_text">
					2. Ticket details
					{!(stage > FormStageEnum.TICKET_DETAIL) || <CheckmarkSVG />}
				</div>

				<div className="progress_bar_text">
					3. Ticket policies
					{!(stage > FormStageEnum.TICKET_POLICY) || <CheckmarkSVG />}
				</div>
			</div>
			<ProgressBarContainer>
				<ProgressBar stage={stage}></ProgressBar>
			</ProgressBarContainer>
		</Container>
	);
}

export default FormProgressBar;
