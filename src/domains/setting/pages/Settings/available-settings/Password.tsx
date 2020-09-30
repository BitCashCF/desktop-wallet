import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import { Alert } from "app/components/Alert";
import { Button } from "app/components/Button";
import { Form, FormField, FormHelperText, FormLabel } from "app/components/Form";
import { Header } from "app/components/Header";
import { InputPassword } from "app/components/Input";
import { useActiveProfile } from "app/hooks/env";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type SettingsProps = {
	env: Environment;
	formConfig: any;
	onSubmit: (profile: Profile) => void;
};

export const PasswordSettings = ({ env, formConfig, onSubmit }: SettingsProps) => {
	const [status, setStatus] = useState<Record<string, string> | null>(null);

	const activeProfile = useActiveProfile();
	const usesPassword = activeProfile.usesPassword();

	const { t } = useTranslation();

	const minLength = 6;

	const { formState, register, reset, trigger, watch } = formConfig.context;

	const handleSubmit = async ({ currentPassword, password_1 }: any) => {
		try {
			if (usesPassword) {
				activeProfile.auth().changePassword(currentPassword, password_1);
			} else {
				activeProfile.auth().setPassword(password_1);
			}
		} catch (error) {
			return setStatus({ type: "error", message: t("SETTINGS.PASSWORD.ERROR.MISMATCH") });
		}

		reset();

		setStatus({ type: "success", message: t("SETTINGS.PASSWORD.SUCCESS") });

		await env.persist();

		onSubmit(activeProfile);
	};

	return (
		<div className="space-y-8">
			<Header
				title={t("SETTINGS.PASSWORD.TITLE")}
				subtitle={
					usesPassword ? t("SETTINGS.PASSWORD.SUBTITLE_UPDATE") : t("SETTINGS.PASSWORD.SUBTITLE_CREATE")
				}
			/>

			{status && (
				<div className="mb-8" data-testid={`Password-settings__${status.type}-alert`}>
					{status.type === "error" ? (
						<Alert variant="danger" size="sm" title={t("COMMON.ERROR")}>
							{status.message}
						</Alert>
					) : (
						<Alert variant="success" size="sm" title={t("COMMON.SUCCESS")}>
							{status.message}
						</Alert>
					)}
				</div>
			)}

			<Form
				id="password-settings__form"
				context={formConfig.context}
				onSubmit={handleSubmit}
				className="space-y-8"
			>
				{usesPassword && (
					<FormField name="currentPassword">
						<FormLabel label={t("SETTINGS.PASSWORD.CURRENT")} />
						<InputPassword
							ref={register({
								required: t("COMMON.VALIDATION.FIELD_REQUIRED", {
									field: t("SETTINGS.PASSWORD.CURRENT"),
								}).toString(),
							})}
							data-testid="Password-settings__input--currentPassword"
						/>
						<FormHelperText />
					</FormField>
				)}

				{[1, 2].map((password: number) => {
					const otherPassword = `password_${password === 1 ? 2 : 1}`;

					const validatePasswords = (password: string) =>
						password === watch(otherPassword) ||
						t("COMMON.VALIDATION.SUBJECT_MISMATCH", {
							subject: t("COMMON.PASSWORDS"),
						}).toString();

					return (
						<FormField key={`password_${password}`} name={`password_${password}`}>
							<FormLabel label={t(`SETTINGS.PASSWORD.PASSWORD_${password}`)} />
							<InputPassword
								onChange={() => {
									if (watch(otherPassword).length) {
										trigger(otherPassword);
									}
								}}
								ref={register({
									required: t("COMMON.VALIDATION.FIELD_REQUIRED", {
										field: t(`SETTINGS.PASSWORD.PASSWORD_${password}`),
									}).toString(),
									minLength: {
										value: minLength,
										message: t("COMMON.VALIDATION.MIN_LENGTH", {
											field: t(`SETTINGS.PASSWORD.PASSWORD_${password}`),
											minLength,
										}),
									},
									validate: validatePasswords,
								})}
								data-testid={`Password-settings__input--password_${password}`}
							/>
							<FormHelperText />
						</FormField>
					);
				})}

				<div className="flex justify-end w-full mt-8">
					<Button data-testid="Password-settings__submit-button" disabled={!formState.isValid} type="submit">
						{usesPassword ? t("SETTINGS.PASSWORD.BUTTON.UPDATE") : t("SETTINGS.PASSWORD.BUTTON.CREATE")}
					</Button>
				</div>
			</Form>
		</div>
	);
};