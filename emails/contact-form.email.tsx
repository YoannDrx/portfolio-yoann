import { Heading, Section, Text } from "@react-email/components";
import {
  EMAIL_COLORS,
  EmailButton,
  EmailDivider,
  EmailInfoCard,
  PortfolioEmailLayout,
} from "./utils/portfolio-email-layout";

type ContactFormEmailProps = {
  senderName: string;
  senderEmail: string;
  message: string;
  sentAt?: Date;
};

/**
 * Contact Form Email Template
 *
 * Sent when someone fills out the contact form on the portfolio
 */
export default function ContactFormEmail({
  senderName = "Jean Dupont",
  senderEmail = "jean.dupont@example.com",
  message = "Bonjour,\n\nJe suis intéressé par vos services de développement mobile. Pourrions-nous en discuter ?\n\nCordialement",
  sentAt = new Date(),
}: ContactFormEmailProps) {
  const formattedDate = sentAt.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <PortfolioEmailLayout
      preview={`💬 Nouveau message de ${senderName}`}
      footerText="Message envoyé depuis le formulaire de contact"
    >
      {/* Title */}
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: EMAIL_COLORS.text,
          textAlign: "center" as const,
          margin: "0 0 8px 0",
          letterSpacing: "-0.3px",
        }}
      >
        Nouveau message
      </Heading>

      <Text
        style={{
          fontSize: "14px",
          color: EMAIL_COLORS.textMuted,
          textAlign: "center" as const,
          margin: "0 0 24px 0",
        }}
      >
        {formattedDate}
      </Text>

      <EmailDivider />

      {/* Sender Info */}
      <Section style={{ marginBottom: "24px" }}>
        <Text
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: EMAIL_COLORS.textMuted,
            textTransform: "uppercase" as const,
            letterSpacing: "0.5px",
            margin: "0 0 12px 0",
          }}
        >
          Expéditeur
        </Text>

        <table
          cellPadding={0}
          cellSpacing={0}
          style={{ width: "100%", borderCollapse: "collapse" as const }}
        >
          <tr>
            <td
              style={{
                padding: "8px 0",
                color: EMAIL_COLORS.textMuted,
                fontSize: "14px",
                width: "70px",
              }}
            >
              Nom
            </td>
            <td
              style={{
                padding: "8px 0",
                color: EMAIL_COLORS.text,
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {senderName}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "8px 0",
                color: EMAIL_COLORS.textMuted,
                fontSize: "14px",
              }}
            >
              Email
            </td>
            <td style={{ padding: "8px 0" }}>
              <a
                href={`mailto:${senderEmail}`}
                style={{
                  color: EMAIL_COLORS.primary,
                  fontSize: "15px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                {senderEmail}
              </a>
            </td>
          </tr>
        </table>
      </Section>

      {/* Message */}
      <Section>
        <Text
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: EMAIL_COLORS.textMuted,
            textTransform: "uppercase" as const,
            letterSpacing: "0.5px",
            margin: "0 0 12px 0",
          }}
        >
          Message
        </Text>

        <EmailInfoCard>
          <Text
            style={{
              fontSize: "15px",
              color: EMAIL_COLORS.text,
              lineHeight: "1.7",
              margin: 0,
              whiteSpace: "pre-wrap" as const,
            }}
          >
            {message}
          </Text>
        </EmailInfoCard>
      </Section>

      <EmailDivider />

      {/* CTA */}
      <Section style={{ textAlign: "center" as const }}>
        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
          }}
        >
          Répondre directement à {senderName}
        </Text>

        <EmailButton
          href={`mailto:${senderEmail}?subject=Re: Message depuis mon portfolio&body=%0A%0A---%0AEn réponse à votre message du ${encodeURIComponent(formattedDate)}`}
        >
          Répondre par email
        </EmailButton>
      </Section>
    </PortfolioEmailLayout>
  );
}
