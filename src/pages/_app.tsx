import TimeAgo from "javascript-time-ago";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import en from "javascript-time-ago/locale/en";
import RootLayout from "~/components/layouts/RootLayout";
import CommonHead from "~/components/common/CommonHead";

TimeAgo.addDefaultLocale(en);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const CisurpRoot: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`dark min-h-screen w-full bg-background font-sans antialiased ${inter.variable}`}
    >
      <CommonHead></CommonHead>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </main>
  );
};

export default CisurpRoot;
