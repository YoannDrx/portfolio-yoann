import type { Metadata } from "next";
import PortfolioPage from "@/components/pages/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio V2 — Preview",
  robots: { index: false, follow: false },
};

export default function V2PreviewPage() {
  return <PortfolioPage />;
}
