import React from "react";
import styled from "styled-components";

import { BoxContainerStyled, LineBreakStyled } from "./Styled";

export const Title = styled.h1`
	margin: 1rem 0;
	font-size: 2rem;
	font-weight: 700;
`;

export const Header = styled.div``;

const Container = styled(BoxContainerStyled)`
	height: 100%;
	padding: 3em 2em;
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

type TPageComponents = {
	Title: typeof Title;
	Header: typeof Header;
	LineBreak: typeof LineBreakStyled;
};

type Props = {
	children: (params: TPageComponents) => JSX.Element;
};

function MainPage({ children }: Props) {
	return (
		<Container>
			<Wrapper>
				{children({ Title, LineBreak: LineBreakStyled, Header })}
			</Wrapper>
		</Container>
	);
}

export default MainPage;
