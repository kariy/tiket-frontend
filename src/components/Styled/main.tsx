import styled from "styled-components";
import { MEDIA_DIMENSIONS } from "@lib/constants/media";

export const MaxContainerStyled = styled.div`
	width: 95%;
	margin: 0 auto;
	max-width: 900px;

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.COMPACT}) {
		width: 90%;
	}

	@media only screen and (min-width: ${MEDIA_DIMENSIONS.MEDIUM}) {
		max-width: 1200px;
	}
`;

export const BoxContainerStyled = styled.div`
	/* overflow: hidden; */
	box-shadow: ${(props) => props.theme.shadow.lg};
	border-radius: ${(props) => props.theme.rounded.lg};
	border: 1px solid ${(props) => props.theme.colors.grey.dark};
`;

export const SectionHeaderStyled = styled.div`
	display: flex;
	align-items: center;

	height: 36px;
	padding: 0 1em;
	margin-top: 1rem;
	margin-bottom: 1rem;

	font-weight: 600;
	color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.rounded.sm};
	background-color: ${(props) => props.theme.colors.primary.medium};
`;

export const LineBreakStyled = styled.div`
	margin: 1.7rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey.medium};
`;
