import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { PropsWithChildren } from "react";

/**
 * Email color tokens - matches the iOS Design System
 */
export const EMAIL_COLORS = {
  // Base
  background: "#F5F5F7",
  card: "#FFFFFF",

  // Primary - iOS Blue
  primary: "#0070F3",
  primaryLight: "#E8F4FF",
  primaryForeground: "#FFFFFF",

  // Text
  text: "#1D1D1F",
  textSecondary: "#424245",
  textMuted: "#86868B",

  // Borders & Shadows
  border: "#E5E5E7",
  borderLight: "#F0F0F2",

  // Semantic
  success: "#22C55E",
  successLight: "#DCFCE7",
};

type PortfolioEmailLayoutProps = PropsWithChildren<{
  /**
   * Preview text shown in email clients
   */
  preview?: string;
  /**
   * Footer text
   */
  footerText?: string;
}>;

/**
 * Portfolio branded email layout
 *
 * Features:
 * - iOS-inspired design (subtle shadows, rounded corners)
 * - Clean and professional look
 * - Mobile-responsive design
 */
export function PortfolioEmailLayout({
  children,
  preview,
  footerText,
}: PortfolioEmailLayoutProps) {
  return (
    <Html>
      <Head />
      {preview && <Preview>{preview}</Preview>}
      <Body
        style={{
          backgroundColor: EMAIL_COLORS.background,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          {/* Main Card */}
          <Section
            style={{
              backgroundColor: EMAIL_COLORS.card,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Header with gradient */}
            <Section
              style={{
                background: `linear-gradient(135deg, ${EMAIL_COLORS.primary} 0%, #00C4CC 100%)`,
                padding: "32px 24px",
                textAlign: "center" as const,
              }}
            >
              <Text
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: EMAIL_COLORS.primaryForeground,
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.5px",
                }}
              >
                Yoann Andrieux
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                Portfolio • Dev React Native
              </Text>
            </Section>

            {/* Content */}
            <Section style={{ padding: "32px 24px" }}>{children}</Section>
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: "center" as const, marginTop: "24px" }}>
            {footerText && (
              <Text
                style={{
                  fontSize: "13px",
                  color: EMAIL_COLORS.textMuted,
                  margin: "0 0 8px 0",
                }}
              >
                {footerText}
              </Text>
            )}
            <Text
              style={{
                fontSize: "12px",
                color: EMAIL_COLORS.textMuted,
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} Yoann Andrieux • Paris, France
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * Email button component with iOS styling
 */
export function EmailButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        backgroundColor: isPrimary ? EMAIL_COLORS.primary : EMAIL_COLORS.card,
        color: isPrimary
          ? EMAIL_COLORS.primaryForeground
          : EMAIL_COLORS.primary,
        padding: "14px 28px",
        borderRadius: "12px",
        border: isPrimary ? "none" : `2px solid ${EMAIL_COLORS.primary}`,
        fontWeight: "600",
        fontSize: "15px",
        textDecoration: "none",
        textAlign: "center" as const,
      }}
    >
      {children}
    </a>
  );
}

/**
 * Info card component for emails
 */
export function EmailInfoCard({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success";
}) {
  const isSuccess = variant === "success";

  return (
    <Section
      style={{
        backgroundColor: isSuccess
          ? EMAIL_COLORS.successLight
          : EMAIL_COLORS.background,
        borderRadius: "12px",
        padding: "20px",
        margin: "20px 0",
        border: `1px solid ${isSuccess ? EMAIL_COLORS.success : EMAIL_COLORS.border}`,
      }}
    >
      {children}
    </Section>
  );
}

/**
 * Divider component
 */
export function EmailDivider() {
  return (
    <Hr
      style={{
        borderColor: EMAIL_COLORS.border,
        borderWidth: "1px",
        margin: "24px 0",
      }}
    />
  );
}
