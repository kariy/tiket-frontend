import styled from "styled-components";

export const LabelStyled = styled.label`
	display: block;
	font-weight: 500;
	font-size: 0.9rem;
	margin: 1.3rem 0;
`;

export const InputStyled = styled.input`
	display: block;
	width: 100%;
	min-width: 200px;

	font-weight: 400;
	margin-top: 0.7rem;
	padding: 0.9em 1em;
	background-color: white;
	transition: outline 50ms ease;
	border-radius: ${(props) => props.theme.rounded.md};
	border: 1px solid ${(props) => props.theme.colors.grey.medium};

	&:focus,
	&:focus-visible {
		outline: 3px solid ${({ theme }) => theme.colors.primary.light};
	}
`;

export const InputFlexWrapperStyled = styled.div`
	display: flex;
	flex-flow: wrap;
	column-gap: 20px;

	& > ${LabelStyled} {
		flex: 1;
	}
`;

export const FormStyled = styled.form``;

export const ErrorInputStyled = styled.div`
	margin: 0.5rem 0;
	font-weight: 500;
	font-style: italic;
	font-size: 0.8rem;
	color: ${({ theme }) => theme.colors.error};
`;
