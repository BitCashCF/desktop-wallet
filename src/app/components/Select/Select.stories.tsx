import React from "react";

import { Select } from "./Select";

export default {
	title: "App / Components / Select",
};

export const Native = () => (
	<div className="max-w-xs space-y-4">
		<Select placeholder="Select option">
			<option value="option1">Option 1</option>
			<option value="option2">Option 2</option>
			<option value="option3">Option 3</option>
		</Select>

		<Select placeholder="Invalid" isInvalid>
			<option value="option1">Option 1</option>
			<option value="option2">Option 2</option>
			<option value="option3">Option 3</option>
		</Select>

		<Select placeholder="Disabled" disabled />
	</div>
);
