import React from "react";
import { render } from "testing-library";

import { ReviewBox } from "./ReviewBox";

const ratings = [
	{
		rating: 5,
		votes: 156,
	},
	{
		rating: 4,
		votes: 194,
	},
	{
		rating: 3,
		votes: 25,
	},
	{
		rating: 2,
		votes: 42,
	},
	{
		rating: 1,
		votes: 7,
	},
];

describe("ReviewBox", () => {
	it("should render properly", () => {
		const { asFragment, getByText } = render(
			<ReviewBox averageScore="4.3" ratings={ratings} totalAvaliations={347} />,
		);

		expect(getByText("Avg. Rating: 4.3")).toBeTruthy();
		expect(getByText("Out of 347 reviews")).toBeTruthy();
		expect(asFragment()).toMatchSnapshot();
	});
});
