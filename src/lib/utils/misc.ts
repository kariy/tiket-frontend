import { MEDIA_CONSTANTS } from "@lib/constants";

export function getTabTitle(page: string) {
	return `${page} | ${MEDIA_CONSTANTS.TAB_APP_TITLE}`;
}
