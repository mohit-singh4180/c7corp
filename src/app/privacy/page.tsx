import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "C7 Corp privacy policy — how we collect, use, and protect your personal data under India's DPDP Act 2023 and US CCPA.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      highlight="Privacy"
      subtitle="How we collect, use, store, and protect your personal data."
      activeHref="/privacy"
    >
      <p className="text-xs mb-6" style={{ color: "var(--c-muted)" }}>
        Effective date: 1 November 2026 &nbsp;|&nbsp; Last updated: 1 November 2026
      </p>

      <p className="mb-6" style={{ color: "var(--c-muted)" }}>
        C7 Corp (&ldquo;C7 Corp&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
        operates the website <strong>c7corp.com</strong> and related products including Book Around
        You (BAY), AI Pulse, C7 Connect, C7 Analytics, and C7 Workspace (collectively,
        the &ldquo;Services&rdquo;). This Privacy Policy explains how we collect, use, disclose, and
        safeguard your personal data when you interact with our Services.
      </p>
      <p className="mb-8" style={{ color: "var(--c-muted)" }}>
        By accessing or using our Services you acknowledge that you have read and understood this
        policy. If you disagree with any part, please discontinue use of our Services.
      </p>

      <h2>1. Applicability and Legal Framework</h2>
      <p>
        C7 Corp is incorporated and operates from Dubai, United Arab Emirates, and New Delhi, India.
        Our data practices are designed to comply with:
      </p>
      <ul>
        <li>
          <strong>India</strong> — the Information Technology Act 2000 and the Digital Personal Data
          Protection Act 2023 (&ldquo;DPDP Act&rdquo;), including rules issued thereunder.
        </li>
        <li>
          <strong>United States</strong> — the California Consumer Privacy Act 2018 (&ldquo;CCPA&rdquo;)
          as amended by the California Privacy Rights Act (&ldquo;CPRA&rdquo;), and applicable
          US federal laws including CAN-SPAM Act and the Children&rsquo;s Online Privacy Protection
          Act (&ldquo;COPPA&rdquo;).
        </li>
        <li>
          <strong>United Arab Emirates</strong> — Federal Decree-Law No. 45 of 2021 on the Protection
          of Personal Data (&ldquo;UAE PDPL&rdquo;).
        </li>
      </ul>

      <h2>2. Personal Data We Collect</h2>
      <p>We collect personal data in the following categories:</p>
      <ul>
        <li>
          <strong>Contact and identity data</strong> — your name, email address, phone number,
          company name, and job title when you fill out a form, register, or contact us.
        </li>
        <li>
          <strong>Usage and device data</strong> — IP address, browser type, operating system,
          pages visited, time spent on pages, referring URLs, and device identifiers collected
          automatically via cookies and similar technologies.
        </li>
        <li>
          <strong>Communications data</strong> — messages you send us via the contact form, email,
          or any support channel.
        </li>
        <li>
          <strong>Marketing preferences</strong> — your opt-in or opt-out status for newsletters
          and product announcements.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect sensitive personal data such as government-issued
        identification numbers, biometric data, financial account details, or health records through
        our marketing website.
      </p>

      <h2>3. How We Use Your Personal Data</h2>
      <p>We process your personal data for the following purposes:</p>
      <ul>
        <li>To respond to your enquiries, demo requests, or partnership proposals.</li>
        <li>
          To send product updates, newsletters, and marketing communications where you have given
          consent or where we have a legitimate interest (you may opt out at any time).
        </li>
        <li>
          To operate, maintain, and improve our Services, including analysing usage patterns and
          debugging technical issues.
        </li>
        <li>To comply with applicable legal obligations and regulatory requirements.</li>
        <li>
          To detect, prevent, and address fraud, security vulnerabilities, and other harmful
          activities.
        </li>
      </ul>
      <p>
        Under the DPDP Act 2023, we process personal data on the basis of your <em>consent</em> or
        our <em>legitimate uses</em> as defined therein. Under the CCPA/CPRA, we do not
        &ldquo;sell&rdquo; or &ldquo;share&rdquo; your personal information for cross-context
        behavioural advertising.
      </p>

      <h2>4. Disclosure of Personal Data</h2>
      <p>
        We do not sell, rent, or trade your personal data. We may share it in limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers</strong> — third-party vendors who provide hosting, analytics,
          email delivery, customer support, or other services on our behalf, subject to contractual
          data-processing agreements.
        </li>
        <li>
          <strong>Legal requirements</strong> — when required by law, court order, or governmental
          authority, including in India under Section 69 of the IT Act or in the US under lawful
          legal process.
        </li>
        <li>
          <strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of
          assets, with appropriate confidentiality obligations.
        </li>
        <li>
          <strong>With your consent</strong> — for any other purpose disclosed to you at the time
          of collection.
        </li>
      </ul>

      <h2>5. International Data Transfers</h2>
      <p>
        We operate from India and UAE, and may transfer personal data to our service providers
        located in other countries. Where required by the DPDP Act, we will ensure that cross-border
        data transfers comply with applicable restrictions notified by the Government of India.
        Where applicable, we implement standard contractual clauses or equivalent safeguards.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain personal data only for as long as necessary to fulfil the purposes described in
        this policy, comply with legal obligations, resolve disputes, and enforce agreements.
        Marketing data is retained until you withdraw consent or opt out. Contact form submissions
        are retained for a maximum of 36 months unless a longer period is required by law.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the following rights regarding your personal
        data:
      </p>
      <ul>
        <li>
          <strong>Access</strong> — request a copy of the personal data we hold about you.
        </li>
        <li>
          <strong>Correction</strong> — request correction of inaccurate or incomplete data
          (DPDP Act, Section 12).
        </li>
        <li>
          <strong>Erasure</strong> — request deletion of your personal data where we no longer have
          a lawful basis to process it (DPDP Act, Section 12; CCPA, Section 1798.105).
        </li>
        <li>
          <strong>Withdrawal of consent</strong> — withdraw consent at any time without affecting
          the lawfulness of processing before withdrawal (DPDP Act, Section 11).
        </li>
        <li>
          <strong>Nomination</strong> — nominate another person to exercise your rights in the
          event of your death or incapacity, as provided under the DPDP Act.
        </li>
        <li>
          <strong>Opt-out of marketing</strong> — unsubscribe from marketing communications at any
          time by clicking the &ldquo;Unsubscribe&rdquo; link in any email or contacting us.
        </li>
        <li>
          <strong>CCPA rights for California residents</strong> — the right to know, delete, correct,
          and opt out of sale/sharing of personal information. We do not discriminate against
          consumers who exercise their CCPA rights.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact our Data Protection team at{" "}
        <a href="mailto:support@c7corp.com">support@c7corp.com</a>. We will respond within the
        timeframe required by applicable law (30 days under DPDP; 45 days under CCPA).
      </p>

      <h2>8. Data Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your personal data
        against unauthorised access, disclosure, alteration, or destruction. These measures include
        encryption in transit (TLS), access controls, and regular security reviews. However, no
        method of transmission over the internet or electronic storage is completely secure, and we
        cannot guarantee absolute security.
      </p>
      <p>
        In the event of a personal data breach that is likely to result in a risk to your rights and
        freedoms, we will notify the relevant authority and affected individuals as required by law.
      </p>

      <h2>9. Children&rsquo;s Privacy</h2>
      <p>
        Our Services are not directed at children under 13 years of age (or 18 years where required
        under the DPDP Act for processing that requires verifiable parental consent). We do not
        knowingly collect personal data from children. If you believe we have inadvertently collected
        data from a child, please contact us immediately so we can delete it.
      </p>

      <h2>10. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar technologies as described in our{" "}
        <a href="/cookies">Cookie Policy</a>. You can manage your cookie preferences through your
        browser settings at any time.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make material changes, we will
        update the &ldquo;Last updated&rdquo; date and, where required, notify you by email or
        prominent notice on our website. Your continued use of our Services after the effective date
        of the revised policy constitutes your acceptance of the changes.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions, concerns, or complaints about this Privacy Policy or our data
        practices, please contact us at:
      </p>
      <p>
        <strong>C7 Corp — Data Protection</strong>
        <br />
        General:{" "}
        <a href="mailto:support@c7corp.com"> support@c7corp.com</a>
        <br />
        Dubai, UAE &nbsp;|&nbsp; New Delhi, India
      </p>
    </LegalLayout>
  );
}
