import PageTransition from '@/components/layouts/PageTransition';
import SEO from '@/components/ui/SEO';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <SEO
        title="Privacy Policy | Merina Builders Construction"
        description="Learn about how Merina Builders Construction collects, stores, and handles customer data for contact forms, AI estimates, and chat logs."
        keywords="Privacy Policy, Merina Builders Privacy, Data Handling, Privacy Compliance"
      />
      <main className="w-full pt-32 pb-24 bg-navy">
        <article className="max-w-3xl mx-auto px-6 text-ivory/80 space-y-6 leading-relaxed font-sans text-sm md:text-base">
          <header className="border-b border-gold/10 pb-6">
            <h1 className="text-3xl md:text-5xl font-bold font-display text-gradient-gold">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-semibold">
              Last Updated: July 07, 2026
            </p>
          </header>

          <p>
            At Merina Builders Construction, accessible from merinabuilders.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected, processed, and recorded by our platform and how we manage it.
          </p>

          <h2 className="text-xl md:text-2xl font-bold font-display text-ivory pt-4">1. Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us when using our website features, specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Contact & Site Visit Forms:</strong> When you submit an inquiry, we collect your name, phone number, email address, and project details. This information is forwarded securely via the Web3Forms API directly to our administrative inbox. We do not store this information on a web server database.</li>
            <li><strong>AI Chat Assistant:</strong> Chat transcripts and conversational histories are stored locally in your browser's session storage for user convenience during your visit. These conversations are not transmitted to or stored on our servers.</li>
            <li><strong>Estimate Calculator:</strong> All details entered into our building cost calculator (area, location, floor specifications, quality preferences) are processed in real-time to generate your approximate budget reports. These inputs are not collected, logged, or shared with third parties.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold font-display text-ivory pt-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide, operate, and maintain our website services and interactive tools</li>
            <li>Respond to your inquiries, schedule site visits, and prepare custom building quotes</li>
            <li>Improve, personalize, and optimize our digital tools (Estimator and Chatbot)</li>
            <li>Communicate with you directly via email, phone, or WhatsApp</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold font-display text-ivory pt-4">3. Data Storage & Security</h2>
          <p>
            We take data security seriously. We do not operate a persistent database to store user personal information. All lead inquiries are routed directly to our secure email inbox at <a href="mailto:merinabuilders@gmail.com" className="text-gold hover:underline font-medium">merinabuilders@gmail.com</a>.
          </p>

          <h2 className="text-xl md:text-2xl font-bold font-display text-ivory pt-4">4. GDPR and Data Protection Rights</h2>
          <p>
            We want to make sure you are fully aware of all of your data data rights. If you have any questions or would like to request that we delete any record of email correspondence, please contact us directly at <a href="mailto:merinabuilders@gmail.com" className="text-gold hover:underline font-medium">merinabuilders@gmail.com</a>.
          </p>
        </article>
      </main>
    </PageTransition>
  );
}
