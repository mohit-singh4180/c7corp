import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Data Protection",
  description:
    "C7 Corp data protection commitment — DPDP Act 2023 (India), CCPA (USA), and GDPR (European users).",
};

export default function GdprPage() {
  return (
    <LegalLayout
      title="Data Protection"
      highlight="Data"
      subtitle="Our commitment to protecting your personal data under Indian, US, and global data protection laws."
      activeHref="/gdpr"
    >
      <p className="text-xs mb-6" style={{ color: "var(--c-muted)" }}>
        Effective date: 1 November 2026 &nbsp;|&nbsp; Last updated: 1 November 2026
      </p>

      <p className="mb-6" style={{ color: "var(--c-muted)" }}>
        C7 Corp takes your privacy and data protection rights seriously. This page outlines our
        compliance commitments under the key data protection frameworks applicable to our operations
        and users — the Digital Personal Data Protection Act 2023 (India), the California Consumer
        Privacy Act / California Privacy Rights Act (USA), and the General Data Protection Regulation
        (European Economic Area and UK users). All commitments are subject to and supplemented by
        our full <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. India — Digital Personal Data Protection Act 2023 (DPDP Act)</h2>
      <p>
        The Digital Personal Data Protection Act 2023 (&ldquo;DPDP Act&rdquo;) governs the
        processing of digital personal data of individuals in India. As a company incorporated and
        operating from New Delhi, India, C7 Corp is a &ldquo;Data Fiduciary&rdquo; under the Act
        and is committed to full compliance.
      </p>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Lawful Basis for Processing
      </h3>
      <p>
        We process personal data either on the basis of your freely given, specific, informed, and
        unambiguous <strong>consent</strong> as required under Section 7 of the DPDP Act, or for
        &ldquo;legitimate uses&rdquo; as notified by the Government of India under Section 8.
      </p>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Rights of Data Principals (You)
      </h3>
      <ul>
        <li>
          <strong>Right to information</strong> (Section 11) — you are entitled to know what
          personal data we process, the purpose, and the entities with whom it is shared.
        </li>
        <li>
          <strong>Right to correction and erasure</strong> (Section 12) — you may request correction
          of inaccurate or incomplete data, or erasure of data we no longer need.
        </li>
        <li>
          <strong>Right to grievance redressal</strong> (Section 13) — you may lodge a grievance
          with our designated Data Protection Officer. We will acknowledge within 48 hours and
          resolve within 30 days.
        </li>
        <li>
          <strong>Right to nominate</strong> (Section 14) — you may nominate another individual to
          exercise these rights on your behalf in the event of your death or incapacity.
        </li>
        <li>
          <strong>Right to withdraw consent</strong> — you may withdraw consent at any time. We
          will cease processing upon receipt, except where we have an overriding legal obligation.
        </li>
      </ul>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Data Localisation and Cross-Border Transfers
      </h3>
      <p>
        We store personal data of Indian users primarily on servers located in India or in countries
        approved by the Government of India for cross-border data transfers under the DPDP Act. We
        will update our practices as the Government of India notifies the list of approved countries
        and additional rules.
      </p>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Data Protection Officer
      </h3>
      <p>
        Our Data Protection Officer (DPO) can be reached at{" "}
        <a href="mailto:support@c7corp.com">support@c7corp.com</a>. The DPO is responsible for
        ensuring DPDP Act compliance across our operations.
      </p>

      <h2>2. United States — CCPA / CPRA (California)</h2>
      <p>
        The California Consumer Privacy Act 2018 as amended by the California Privacy Rights Act
        (&ldquo;CCPA/CPRA&rdquo;) grants California residents enhanced rights over their personal
        information. If you are a California resident, the following applies to you.
      </p>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Categories of Personal Information Collected
      </h3>
      <p>
        We collect the following CCPA categories: identifiers (name, email, IP address); commercial
        information (service enquiries); internet or network activity (pages visited, device data);
        and inferences drawn from the above. We do not collect sensitive personal information as
        defined under CPRA from our marketing website.
      </p>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        Your CCPA/CPRA Rights
      </h3>
      <ul>
        <li>
          <strong>Right to Know</strong> (Section 1798.100) — request disclosure of the categories
          and specific pieces of personal information we have collected about you.
        </li>
        <li>
          <strong>Right to Delete</strong> (Section 1798.105) — request deletion of your personal
          information, subject to certain exceptions.
        </li>
        <li>
          <strong>Right to Correct</strong> (Section 1798.106) — request correction of inaccurate
          personal information.
        </li>
        <li>
          <strong>Right to Opt-Out of Sale/Sharing</strong> (Section 1798.120) — we do not
          &ldquo;sell&rdquo; or &ldquo;share&rdquo; personal information as defined under CCPA/CPRA.
        </li>
        <li>
          <strong>Right to Non-Discrimination</strong> (Section 1798.125) — we will not discriminate
          against you for exercising your CCPA rights.
        </li>
      </ul>
      <p>
        To submit a verifiable consumer request, email
        <a href="mailto:support@c7corp.com"> support@c7corp.com</a> with the subject line &ldquo;CCPA
        Request&rdquo;. We will respond within 45 days (extendable by a further 45 days with notice).
        You may also designate an authorised agent to make a request on your behalf.
      </p>

      <h2>3. European Economic Area and UK — GDPR</h2>
      <p>
        While C7 Corp is primarily an India and UAE-based company, we recognise that some users may
        access our website from the European Economic Area (EEA) or the United Kingdom. To the
        extent we process personal data of EEA or UK residents and the GDPR or UK GDPR applies, we
        comply with the following:
      </p>
      <ul>
        <li>
          <strong>Lawful basis</strong> — we process EEA/UK personal data on the basis of consent,
          legitimate interests, or contract performance, as appropriate.
        </li>
        <li>
          <strong>Data subject rights</strong> — EEA/UK individuals have rights of access,
          rectification, erasure, restriction, portability, and objection under Articles 15&ndash;21
          GDPR. Contact us at <a href="mailto:support@c7corp.com">support@c7corp.com</a> to exercise
          these rights.
        </li>
        <li>
          <strong>International transfers</strong> — transfers of EEA/UK personal data outside the
          EEA are conducted under EU Standard Contractual Clauses or other appropriate safeguards.
        </li>
        <li>
          <strong>Supervisory authority</strong> — if you believe our processing of your personal
          data infringes the GDPR, you have the right to lodge a complaint with your national data
          protection supervisory authority.
        </li>
      </ul>

      <h2>4. Data Breach Notification</h2>
      <p>
        In the event of a personal data breach, we will notify the relevant supervisory authority
        within 72 hours of becoming aware (where required), and notify affected individuals where
        there is a high risk to their rights and freedoms, in accordance with applicable law.
      </p>

      <h2>5. Data Protection by Design and Default</h2>
      <p>
        We implement privacy by design and by default principles across our products. This includes
        data minimisation (collecting only what is necessary), purpose limitation, storage limitation,
        and appropriate technical and organisational security measures including encryption, access
        controls, and regular audits.
      </p>

      <h2>6. Contact — Data Protection Officer</h2>
      <p>
        For any data protection enquiries, to exercise your rights, or to raise a concern, please
        contact:
      </p>
      <p>
        <strong>C7 Corp — Data Protection Officer</strong>
        <br />
        General:{" "}
        <a href="mailto:support@c7corp.com">support@c7corp.com</a>
        <br />
        Dubai, UAE &nbsp;|&nbsp; New Delhi, India
      </p>
    </LegalLayout>
  );
}
