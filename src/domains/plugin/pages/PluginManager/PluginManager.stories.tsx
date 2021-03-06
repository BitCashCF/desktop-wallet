import React from "react";

import { PluginManager } from "./PluginManager";

export default { title: "Domains / Plugin / Pages / PluginManager" };

export const Default = () => {
	const paths = {
		featured: "/?path=/story/domains-plugin-pages-plugins-category--featured",
		topRated: "/?path=/story/domains-plugin-pages-plugins-category--top-rated",
		topUtilities: "/?path=/story/domains-plugin-pages-plugins-category--top-utilities",
	};

	return <PluginManager paths={paths} />;
};
