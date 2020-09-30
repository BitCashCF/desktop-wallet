import { Alert } from "app/components/Alert";
import { Button } from "app/components/Button";
import { Clipboard } from "app/components/Clipboard";
import { Divider } from "app/components/Divider";
import { Header } from "app/components/Header";
import { Icon } from "app/components/Icon";
import { toasts } from "app/services";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { saveFile } from "utils/electron-utils";

import { MnemonicList } from "../../components/MnemonicList";

export const SecondStep = () => {
	const { getValues, unregister, watch } = useFormContext();

	// getValues does not get the value of `defaultValues` on first render
	const [defaultMnemonic] = useState(() => watch("mnemonic"));
	const mnemonic = getValues("mnemonic") || defaultMnemonic;

	const [defaultWallet] = useState(() => watch("wallet"));
	const wallet = getValues("wallet") || defaultWallet;

	const { t } = useTranslation();

	useEffect(() => {
		unregister("verification");
	}, [unregister]);

	const handleDownload = async () => {
		const fileName = `${wallet.address()}.txt`;

		try {
			const filePath = await saveFile(mnemonic, fileName, {
				filters: { name: "Text Document", extensions: ["txt"] },
				returnBasename: true,
			});

			if (filePath) {
				toasts.success(
					<Trans
						i18nKey="COMMON.SAVE_FILE.SUCCESS"
						values={{ filePath }}
						components={{ bold: <strong /> }}
					/>,
				);
			}
		} catch (error) {
			toasts.error(t("COMMON.SAVE_FILE.ERROR", { error: error.message }));
		}
	};

	return (
		<section data-testid="CreateWallet__second-step" className="space-y-8">
			<Header title={t("WALLETS.PAGE_CREATE_WALLET.PASSPHRASE_STEP.TITLE")} />

			<Alert size="lg">{t("WALLETS.PAGE_CREATE_WALLET.PASSPHRASE_STEP.WARNING")}</Alert>
			<MnemonicList mnemonic={mnemonic} />

			<div className="flex justify-end w-full">
				<Clipboard data={mnemonic}>
					<Button data-testid="CreateWallet__copy" variant="plain">
						<Icon name="Copy" />
						<span>{t("COMMON.COPY")}</span>
					</Button>
				</Clipboard>
			</div>

			<Divider dashed />

			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<span className="text-lg font-semibold text-theme-neutral-dark">
						{t("WALLETS.PAGE_CREATE_WALLET.PASSPHRASE_STEP.DOWNLOAD.TITLE")}
					</span>
					<p className="text-sm text-theme-neutral">
						{t("WALLETS.PAGE_CREATE_WALLET.PASSPHRASE_STEP.DOWNLOAD.DESCRIPTION")}
					</p>
				</div>

				<Icon name="FilePassword" width={40} height={40} />
			</div>

			<div className="flex justify-end w-full">
				<Button
					data-testid="CreateWallet__download"
					variant="plain"
					className="flex items-center space-x-2"
					onClick={handleDownload}
				>
					<Icon name="Download" />
					<span>{t("COMMON.DOWNLOAD")}</span>
				</Button>
			</div>

			<Divider dashed />
		</section>
	);
};