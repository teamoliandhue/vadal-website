import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "GDPR",
  description: "How Vadal supports compliance with the EU/UK General Data Protection Regulation.",
};

export default function GdprPage() {
  return (
    <LegalPage
      title="GDPR"
      updated="June 2026"
      intro="Vadal is built to help organisations meet their obligations under the EU and UK General Data Protection Regulation. This page summarises our approach; a Data Processing Agreement (DPA) is available to customers."
      sections={[
        { heading: "Roles", body: ["For employee data processed in the platform, your organisation is the controller and Vadal is the processor, acting only on documented instructions."] },
        { heading: "Lawful basis & data minimisation", body: ["We help controllers collect only what's needed for engagement and experience use cases, and to define retention that fits their lawful basis."] },
        { heading: "Data subject rights", body: ["The platform provides tools to support access, rectification, erasure and portability requests so controllers can respond within statutory timeframes."] },
        { heading: "International transfers", body: ["Where data is transferred internationally, we rely on appropriate safeguards such as Standard Contractual Clauses, and offer data residency options."] },
        { heading: "Sub-processors", body: ["We maintain a current list of sub-processors and notify customers of changes in line with the DPA."] },
        { heading: "Security & breach notification", body: ["Technical and organisational measures protect personal data, and we operate a process to notify controllers of any personal data breach without undue delay."] },
        { heading: "Requesting a DPA", body: ["Customers can request Vadal's Data Processing Agreement by contacting privacy@vadal.ai. (Illustrative for this build — confirm final terms with counsel.)"] },
      ]}
    />
  );
}
