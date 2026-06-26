import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern use of the Vadal website and platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="June 2026"
      intro="These Terms govern your access to and use of the Vadal website and platform. By using our services you agree to them. Commercial use of the platform is additionally governed by the agreement signed with your organisation."
      sections={[
        { heading: "Use of the service", body: ["You may use the website and platform only in line with these Terms and applicable law, and only for the purposes for which they are provided."] },
        { heading: "Accounts", body: ["You are responsible for activity under your account and for keeping your credentials secure. Notify us promptly of any unauthorised use."] },
        { heading: "Acceptable use", body: ["Don't misuse the service: no attempts to breach security, disrupt the platform, scrape at scale, or use it to share unlawful or harmful content."] },
        { heading: "Intellectual property", body: ["Vadal and its licensors own the platform, brand and content we provide. You retain ownership of the content your organisation creates within the platform."] },
        { heading: "Availability & changes", body: ["We work to keep the service available and may update features over time. We may modify these Terms; material changes will be communicated."] },
        { heading: "Disclaimers & liability", body: ["The website is provided on an \"as is\" basis to the extent permitted by law. Commercial warranties and liability are set out in your organisation's agreement with Vadal."] },
        { heading: "Governing law", body: ["These Terms are governed by the laws stated in your organisation's agreement, or otherwise by the laws applicable to Vadal's place of business. (Placeholder for this build — confirm with counsel.)"] },
      ]}
    />
  );
}
