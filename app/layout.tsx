import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yoann Andrieux - Portfolio",
  description: "Développeur Mobile & Web - React Native, iOS, Android, Web",
  keywords: ["développeur", "mobile", "web", "react native", "ios", "android", "portfolio"],
  authors: [{ name: "Yoann Andrieux" }],
  openGraph: {
    title: "Yoann Andrieux - Portfolio",
    description: "Développeur Mobile & Web - React Native, iOS, Android, Web",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
