import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "C7 Corp terms of service — the rules and guidelines governing use of our products and services.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      highlight="Terms"
      subtitle="Rules and guidelines governing the use of our products and services."
      activeHref="/terms"
    >
      <p className="text-xs mb-6" style={{ color: "var(--c-muted)" }}>
        Effective date: 1 November 2026 &nbsp;|&nbsp; Last updated: 1 November 2026
      </p>

      <p className="mb-6" style={{ color: "var(--c-muted)" }}>
        These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between
        you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) and C7 Corp
        (&ldquo;C7 Corp&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;),
        governing your access to and use of the website <strong>c7corp.com</strong> and all
        associated products including Book Around You (BAY), AI Pulse, C7 Connect, C7 Analytics,
        and C7 Workspace (collectively, the &ldquo;Services&rdquo;).
      </p>
      <p className="mb-8" style={{ color: "var(--c-muted)" }}>
        By accessing or using our Services you confirm that you are at least 18 years old, have read
        these Terms, and agree to be bound by them. If you do not agree, you must not access or use
        our Services.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        Your access to and use of our Services is conditioned on your acceptance of and compliance
        with these Terms. These Terms apply to all visitors, users, and others who access the
        Services. Where applicable, these Terms are governed by the Indian Contract Act 1872 for
        users in India, and applicable US federal and state contract law for users in the United
        States.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        C7 Corp provides AI-first technology products and services for businesses. Our current
        product portfolio includes:
      </p>
      <ul>
        <li>
          <strong>Book Around You (BAY)</strong> — An online discovery and booking platform
          connecting users with gyms, health spaces, coaching centres, libraries, and skill classes.
        </li>
        <li>
          <strong>AI Pulse, C7 Connect, C7 Analytics, C7 Workspace</strong> — Business productivity
          and intelligence tools currently in development.
        </li>
      </ul>
      <p>
        We reserve the right to modify, suspend, or discontinue any Service (or part thereof) at
        any time with or without notice. We will not be liable to you or any third party for any
        such modification, suspension, or discontinuation.
      </p>

      <h2>3. User Responsibilities and Acceptable Use</h2>
      <p>You agree to use the Services only for lawful purposes. You must not:</p>
      <ul>
        <li>
          Violate any applicable local, national, or international law or regulation, including the
          Information Technology Act 2000, the IT (Amendment) Act 2008, and applicable US federal
          and state laws.
        </li>
        <li>
          Transmit any unsolicited or unauthorised advertising or promotional material (spam), or
          violate the CAN-SPAM Act or India&rsquo;s TRAI regulations on unsolicited commercial
          communications.
        </li>
        <li>
          Attempt to gain unauthorised access to any part of the Services, other users&rsquo;
          accounts, or any computer system or network connected to the Services.
        </li>
        <li>
          Upload or transmit viruses, malware, or any other malicious code that could damage,
          disable, or impair the Services.
        </li>
        <li>
          Engage in any conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of the
          Services, or which may harm C7 Corp or other users.
        </li>
        <li>
          Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without
          our express written permission.
        </li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        The Services and their entire contents, features, and functionality — including but not
        limited to all information, software, text, displays, images, video, audio, and the design,
        selection, and arrangement thereof — are owned by C7 Corp or its licensors and are protected
        by Indian copyright law (Copyright Act 1957), US copyright law, international copyright
        conventions, and other intellectual property laws worldwide.
      </p>
      <p>
        You are granted a limited, non-exclusive, non-transferable, revocable licence to access and
        use the Services for personal or internal business purposes only. No right, title, or
        interest in or to the Services is transferred to you.
      </p>
      <p>
        &ldquo;C7 Corp&rdquo; and all related logos, product names, and service names are
        trademarks of C7 Corp. You must not use such marks without our prior written consent.
      </p>

      <h2>5. Privacy</h2>
      <p>
        Your use of the Services is also governed by our{" "}
        <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference.
        By using the Services, you consent to the collection and use of your personal data as
        described in the Privacy Policy.
      </p>

      <h2>6. Third-Party Links and Services</h2>
      <p>
        Our Services may contain links to third-party websites or services that are not owned or
        controlled by C7 Corp. We have no control over and assume no responsibility for the content,
        privacy policies, or practices of any third-party websites. We encourage you to review the
        privacy policy and terms of service of any third-party site you visit.
      </p>

      <h2>7. Disclaimers and Limitation of Liability</h2>
      <p>
        THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS
        WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
      </p>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, C7 CORP SHALL NOT BE LIABLE FOR ANY
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF
        PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING OUT OF OR IN CONNECTION WITH
        YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF C7 CORP HAS BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        In jurisdictions that do not allow the exclusion or limitation of incidental or consequential
        damages, our liability shall be limited to the maximum extent permitted by law.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless C7 Corp and its officers, directors,
        employees, contractors, and agents from and against any claims, liabilities, damages,
        judgments, awards, losses, costs, expenses, or fees (including reasonable legal fees) arising
        out of or relating to your violation of these Terms or your use of the Services.
      </p>

      <h2>9. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of India, without
        regard to conflict of law principles. Any dispute arising from or relating to these Terms or
        the Services shall first be attempted to be resolved through good-faith negotiations between
        the parties. If unresolved within 30 days, disputes shall be submitted to binding arbitration
        in accordance with the Arbitration and Conciliation Act 1996 of India, with the seat of
        arbitration in New Delhi, India.
      </p>
      <p>
        For users in the United States, to the extent arbitration is not applicable, you consent to
        the exclusive jurisdiction of the courts located in the State of Delaware.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. When we make material changes, we
        will update the &ldquo;Last updated&rdquo; date and provide notice as required by applicable
        law. Your continued use of the Services after the effective date of revised Terms constitutes
        your acceptance.
      </p>

      <h2>11. Termination</h2>
      <p>
        We may terminate or suspend your access to the Services immediately, without prior notice or
        liability, for any reason, including if you breach these Terms. Upon termination, your right
        to use the Services ceases immediately.
      </p>

      <h2>12. Contact</h2>
      <p>For any questions about these Terms, please contact us at:</p>
      <p>
        <strong>C7 Corp — Legal</strong>
        <br />
        General:{" "}
        <a href="mailto:support@c7corp.com">support@c7corp.com</a>
        <br />
        Dubai, UAE &nbsp;|&nbsp; New Delhi, India
      </p>
    </LegalLayout>
  );
}
