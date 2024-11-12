'use client'

import { Inter } from "next/font/google";
import 'simplebar-react/dist/simplebar.min.css';
import "./css/globals.css";
import "./css/nprogress.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "KMIPN Project",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${inter.className}`}>
        <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
      </body>
    </html>
  );
}
