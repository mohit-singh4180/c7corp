import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "C7 Corp cookie policy — how we use cookies and similar tracking technologies on our website.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      highlight="Cookie"
      subtitle="How we use cookies and similar tracking technologies on our website."
      activeHref="/cookies"
    >
      <p className="text-xs mb-6" style={{ color: "var(--c-muted)" }}>
        Effective date: 1 November 2026 &nbsp;|&nbsp; Last updated: 1 November 2026
      </p>

      <p className="mb-6" style={{ color: "var(--c-muted)" }}>
        This Cookie Policy explains how C7 Corp (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
        &ldquo;our&rdquo;) uses cookies and similar tracking technologies when you visit
        <strong> c7corp.com</strong>. It should be read alongside our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your device (computer, tablet, or mobile)
        when you visit a website. They are widely used to make websites work more efficiently, to
        remember your preferences, and to provide information to website owners. Similar technologies
        include web beacons, pixel tags, local storage, and session storage.
      </p>

      <h2>2. Categories of Cookies We Use</h2>
      <p>We use the following categories of cookies:</p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        2.1 Strictly Necessary Cookies
      </h3>
      <p>
        These cookies are essential for the website to function and cannot be switched off. They are
        usually set in response to actions you take such as filling in forms or setting preferences.
        You can configure your browser to block these cookies, but parts of the site may not function
        correctly as a result.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        2.2 Performance and Analytics Cookies
      </h3>
      <p>
        These cookies allow us to count visits and traffic sources so we can measure and improve the
        performance of our website. They help us understand which pages are most and least popular
        and how visitors navigate the site. All information collected by these cookies is aggregated
        and therefore anonymous. We use tools such as Google Analytics or similar services for this
        purpose.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        2.3 Functional Cookies
      </h3>
      <p>
        Functional cookies enable the website to remember choices you make (such as your language
        preference or region) and provide enhanced, more personal features. They may be set by us or
        by third-party providers whose services we have added to our pages.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
        2.4 Marketing and Targeting Cookies
      </h3>
      <p>
        We do not currently use cookies for targeted advertising or cross-site tracking. Should this
        change, we will update this Cookie Policy and seek any required consent before deploying such
        cookies.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some cookies on our website are set by third-party services we use to enhance the site
        experience. These may include analytics providers (e.g., Google Analytics), content delivery
        networks, or embedded media providers. Third-party cookies are subject to the respective
        third party&rsquo;s privacy and cookie policies. We encourage you to review those policies.
      </p>

      <h2>4. Your Choices and How to Manage Cookies</h2>
      <p>You have several options to control or limit how cookies are used:</p>
      <ul>
        <li>
          <strong>Browser settings</strong> — most web browsers allow you to manage cookies through
          their settings. You can set your browser to refuse all cookies or to alert you when cookies
          are being sent. The &ldquo;Help&rdquo; section of your browser typically explains how to do
          this. Please note that disabling cookies may affect the functionality of this and other
          websites you visit.
        </li>
        <li>
          <strong>Opt-out of analytics</strong> — you can opt out of Google Analytics by installing
          the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </li>
        <li>
          <strong>Do Not Track</strong> — some browsers have a &ldquo;Do Not Track&rdquo; feature
          that signals websites that you do not want to have your online activity tracked. We honour
          Do Not Track signals where technically feasible.
        </li>
      </ul>

      <h2>5. Cookie Retention</h2>
      <p>
        Session cookies expire when you close your browser. Persistent cookies remain on your device
        until they expire or until you delete them. The specific retention period of each cookie
        depends on its purpose; analytics cookies typically expire after 12&ndash;26 months.
      </p>

      <h2>6. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology,
        regulation, or our Services. We encourage you to review this policy periodically. The
        &ldquo;Last updated&rdquo; date at the top indicates when the policy was last revised.
      </p>

      <h2>7. Contact</h2>
      <p>
        If you have questions about our use of cookies, please contact us at:
      </p>
      <p>
        <strong>C7 Corp — Privacy</strong>
        <br />
        General:{" "}
        <a href="mailto:support@c7corp.com">support@c7corp.com</a>
        <br />
        Dubai, UAE &nbsp;|&nbsp; New Delhi, India
      </p>
    </LegalLayout>
  );
}
