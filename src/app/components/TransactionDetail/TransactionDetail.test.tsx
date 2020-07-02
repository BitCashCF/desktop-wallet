import React from "react";
import { render } from "testing-library";

import { TransactionDetail } from "./TransactionDetail";

describe("TransactionDetail", () => {
	it("should render", () => {
		const { container } = render(<TransactionDetail label="Test">test</TransactionDetail>);
		expect(container).toMatchSnapshot();
	});

	it("should render without border", () => {
		const { container } = render(
			<TransactionDetail label="Test" border={false}>
				test
			</TransactionDetail>,
		);
		expect(container).toMatchSnapshot();
	});

	it("should render without padding", () => {
		const { container } = render(
			<TransactionDetail label="Test" padding={false}>
				test
			</TransactionDetail>,
		);
		expect(container).toMatchSnapshot();
	});
});
