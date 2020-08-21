import { Contracts } from "@arkecosystem/platform-sdk";
import { Button } from "app/components/Button";
import { TransactionTable } from "domains/transaction/components/TransactionTable";
import React from "react";
import { useTranslation } from "react-i18next";

type TransactionsProps = {
	title: string;
	transactions: Contracts.TransactionDataType[];
	fetchMoreAction?: Function;
	onRowClick?: (row: Contracts.TransactionDataType) => void;
	emptyText?: string;
	isLoading?: boolean;
};

export const Transactions = ({
	transactions,
	title,
	emptyText,
	fetchMoreAction,
	isLoading,
	onRowClick,
}: TransactionsProps) => {
	const { t } = useTranslation();

	return (
		<div className="bg-white">
			<div className="text-4xl font-bold">{title}</div>
			<div className="pt-8">
				<TransactionTable
					transactions={transactions}
					currencyRate="2"
					isLoading={isLoading}
					onRowClick={onRowClick}
				/>

				{transactions.length > 0 && (
					<Button
						data-testid="transactions__fetch-more-button"
						variant="plain"
						className="w-full mt-10 mb-5"
						onClick={() => fetchMoreAction && fetchMoreAction()}
					>
						{t("COMMON.VIEW_MORE")}
					</Button>
				)}
			</div>
			{!isLoading && transactions.length === 0 && <div className="text-theme-neutral-dark">{emptyText}</div>}
		</div>
	);
};

Transactions.defaultProps = {
	title: "Transactions History",
	emptyText:
		"This will display the history of your transactions. But you don't have more than one transaction at the moment.",
	transactions: [],
};
