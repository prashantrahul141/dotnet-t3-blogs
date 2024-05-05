import TimeAgo from "javascript-time-ago";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import en from "javascript-time-ago/locale/en";

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
      <Component {...pageProps} />
    </main>
  );
};

export default CisurpRoot;
