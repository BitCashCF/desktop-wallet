import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import React from "react";
import { WalletsDecorator } from "utils/storybook";

import { networks } from "../../data";
import { Wallets } from "./Wallets";

export default {
	title: "Domains / Dashboard / Components / Wallets",
	decorators: [(storyFn: any) => <WalletsDecorator count={1}>{storyFn}</WalletsDecorator>],
};

export const Default = ({ wallets }: { wallets: ReadWriteWallet[] }) => {
	// Wallet filter properties
	const filterProperties = {
		visibleTransactionsView: true,
		visiblePortfolioView: true,
		networks,
		onNetworkChange: (changedNetwork: any, newNetworksList: any) => {
			console.log("changed network", changedNetwork);
			console.log("changed network new list", newNetworksList);
		},
		togglePortfolioView: (isChecked: boolean) => {
			console.log("show portfolio view", isChecked);
		},
		toggleTransactionsView: (isChecked: boolean) => {
			console.log("show transactions view", isChecked);
		},
		onWalletsDisplay: () => {
			alert("on Wallet display");
		},
		onViewAllNetworks: () => {
			alert("on view all networks");
		},
	};

	return (
		<div className="px-40">
			<Wallets title="Wallets" wallets={wallets} filterProperties={filterProperties} />
		</div>
	);
};
