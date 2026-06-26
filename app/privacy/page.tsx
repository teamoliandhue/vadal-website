import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vadal collects, uses and protects personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro="This Privacy Policy explains how Vadal collects, uses, shares and protects personal data when you use our website and platform. We design for privacy first — especially because much of the data we handle belongs to employees who trust their employer's platform."
      sections={[
        { heading: "Who we are", body: ["Vadal provides an employee engagement and experience platform. For data submitted by an organisation's employees, that organisation is the data controller and Vadal acts as the data processor on its behalf."] },
        { heading: "Data we collect", body: ["Account and contact details you provide (for example when you book a demo), usage data about how the website and app are used, and content created within the platform by your organisation and its people."] },
        { heading: "How we use data", body: ["To provide and improve the service, to respond to enquiries, to keep the platform secure, and to communicate with you where you have asked us to. We do not sell personal data."] },
        { heading: "Anonymity & sensitive feedback", body: ["Survey and sentiment results are protected by minimum-response-count (min-N) gating so individuals cannot be identified from aggregated results."] },
        { heading: "Sharing", body: ["We share data only with sub-processors who help us run the service under contract, or where required by law. A current list of sub-processors is available on request."] },
        { heading: "Your rights", body: ["Depending on your location you may have rights to access, correct, delete or port your data, and to object to certain processing. Contact privacy@vadal.ai to exercise them."] },
        { heading: "Retention & security", body: ["We keep personal data only as long as needed for the purposes above, and protect it with encryption, access controls and audit trails."] },
        { heading: "Contact", body: ["Questions about this policy can be sent to privacy@vadal.ai. (Contact details are illustrative samples for this build.)"] },
      ]}
    />
  );
}
