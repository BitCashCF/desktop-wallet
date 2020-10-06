import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { images } from "app/assets/images";
import { CircularProgressBar } from "app/components/CircularProgressBar";
import { Divider } from "app/components/Divider";
import { Page, Section } from "app/components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import tw, { styled } from "twin.macro";

import { version } from "../../../../../package.json";

const { ARKLogo, WelcomeBanner } = images.common;

const LogoContainer = styled.div`
	${tw`flex items-center justify-center mr-2 text-theme-background bg-theme-neutral-500 rounded-sm`};
	width: 18px;
	height: 18px;
`;

export const Splash = ({ year }: any) => {
	const { t } = useTranslation();

	const currentYear = year || DateTime.make().format("YYYY");

	return (
		<Page navbarVariant="logo-only">
			<Section className="flex flex-col justify-center flex-1 text-center">
				<div className="w-64 mx-auto lg:w-128">
					<WelcomeBanner />
				</div>

				<div data-testid="Splash__text" className="mt-8">
					<h1 className="text-4xl font-extrabold">{t("SPLASH.BRAND")}</h1>
					<p className="text-theme-neutral-dark animate-pulse">{t("SPLASH.LOADING")}</p>
					<div className="flex justify-center mt-4">
						<div className="animate-spin">
							<CircularProgressBar
								showValue={false}
								value={20}
								strokeWidth={2}
								size={40}
								progressColor="var(--theme-color-primary)"
							/>
						</div>
					</div>
				</div>
				<div
					data-testid="Splash__footer"
					className="fixed left-0 right-0 flex items-center justify-center text-xs font-semibold bottom-5 text-theme-neutral-500"
				>
					<div>
						{currentYear} {t("SPLASH.COPYRIGHT")}
					</div>

					<Divider type="vertical" />

					<div>{t("SPLASH.RIGHTS")}</div>

					<Divider type="vertical" />

					<LogoContainer>
						<ARKLogo width={18} />
					</LogoContainer>

					<div>{t("SPLASH.PRODUCT")}</div>

					<Divider type="vertical" />

					<div>
						{t("SPLASH.VERSION")} {version}
					</div>
				</div>
			</Section>
		</Page>
	);
};
