import { Fragment } from "react";

import { useSidebar, useUser } from "@lib/hooks";

import SidebarContent from "./SidebarContent";

function SidebarContainer() {
	const user = useUser();
	const sidebar = useSidebar();

	return (
		<Fragment>
			<SidebarContent show={sidebar.state} isSignedIn={user.isSignedIn} />
		</Fragment>
	);
}

export default SidebarContainer;
