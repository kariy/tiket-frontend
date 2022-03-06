import styled from "styled-components";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useRef } from "react";

const AnchorStyled = styled.a`
	height: 100%;
	display: block;
	cursor: pointer;
`;

interface Props extends React.PropsWithChildren<LinkProps> {
	className?: string;
	activeClass?: string;
}

function NavLink(props: React.PropsWithChildren<Props>) {
	const { activeClass, className, ...linkProps } = props;

	const router = useRouter();
	const anchorRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		if (!anchorRef.current || !activeClass) return;

		const anchorClasses = anchorRef.current.classList;

		if (router.asPath === linkProps.href) anchorClasses.add(activeClass);
		else anchorClasses.remove(activeClass);
	}, [router, anchorRef, activeClass, linkProps.href]);

	return (
		<Link {...linkProps}>
			<AnchorStyled ref={anchorRef} className={className}>
				{props.children}
			</AnchorStyled>
		</Link>
	);
}

export default NavLink;
