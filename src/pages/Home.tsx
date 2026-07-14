import PageTransition from '@/components/layouts/PageTransition';
import HeroImageSequence from '@/components/sections/HeroImageSequence';
import TrustedBySection from '@/components/sections/TrustedBySection';
import ServicesOverviewSection from '@/components/sections/ServicesOverviewSection';
import ProjectShowcaseSection from '@/components/sections/ProjectShowcaseSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import SEO from '@/components/ui/SEO';

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "additionalType": "https://schema.org/ConstructionCompany",
        "@id": "https://merinabuilders.com/#localbusiness",
        "name": "Merina Builders Construction",
        "description": "Merina Builders is a trusted construction company specializing in commercial construction, renovation & remodeling, project management, church construction, and AI-powered construction cost estimation across Thanjavur, Kumbakonam, and surrounding areas.",
        "url": "https://merinabuilders.com",
        "logo": "https://merinabuilders.com/logo.png",
        "image": "https://merinabuilders.com/logo.png",
        "telephone": "+91 99947 74598",
        "email": "merinabuilders@gmail.com",
        "priceRange": "Custom Quotations",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "5/286, Ponnagar 2nd Street, Pasupathikovil",
          "addressLocality": "Thanjavur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "614206",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" },
          { "@type": "City", "name": "Papanasam" },
          { "@type": "City", "name": "Orathanadu" },
          { "@type": "City", "name": "Pattukkottai" },
          { "@type": "City", "name": "Needamangalam" },
          { "@type": "City", "name": "Thiruvidaimarudur" },
          { "@type": "City", "name": "Thiruvarur" },
          { "@type": "City", "name": "Mannargudi" },
          { "@type": "City", "name": "Mayiladuthurai" },
          { "@type": "City", "name": "Nagapattinam" },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 10.889114,
              "longitude": 79.180363
            },
            "geoRadius": "60000"
          }
        ],
        "sameAs": [
          "https://facebook.com/merinabuilders",
          "https://instagram.com/merinabuilders",
          "https://linkedin.com/company/merinabuilders",
          "https://youtube.com/@merinabuilders"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mr. Antony Louis P."
        }
      },
      {
        "@type": "Organization",
        "@id": "https://merinabuilders.com/#organization",
        "name": "Merina Builders Construction",
        "url": "https://merinabuilders.com",
        "logo": "https://merinabuilders.com/logo.png",
        "email": "merinabuilders@gmail.com",
        "telephone": "+91 99947 74598",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 99947 74598",
            "contactType": "customer support",
            "availableLanguage": ["English", "Tamil"]
          }
        ],
        "sameAs": [
          "https://facebook.com/merinabuilders",
          "https://instagram.com/merinabuilders",
          "https://linkedin.com/company/merinabuilders",
          "https://youtube.com/@merinabuilders"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://merinabuilders.com/#website",
        "url": "https://merinabuilders.com",
        "name": "Merina Builders Construction",
        "publisher": {
          "@id": "https://merinabuilders.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://merinabuilders.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "name": "Commercial Construction",
        "description": "High-quality office spaces, retail outlets, and commercial infrastructure builds tailored to business needs in Tamil Nadu.",
        "provider": { "@id": "https://merinabuilders.com/#localbusiness" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" }
        ]
      },
      {
        "@type": "Service",
        "name": "Renovation & Remodeling",
        "description": "Renovating and restoring residential, heritage, and commercial sites with premium craftsmanship.",
        "provider": { "@id": "https://merinabuilders.com/#localbusiness" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" }
        ]
      },
      {
        "@type": "Service",
        "name": "Project Management",
        "description": "End-to-end supervision, scheduling, quality checks, and billing controls for large-scale developments.",
        "provider": { "@id": "https://merinabuilders.com/#localbusiness" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" }
        ]
      },
      {
        "@type": "Service",
        "name": "Construction Cost Estimation",
        "description": "AI-assisted detailed budget breakdowns, quantities billing, and structural engineering cost estimation.",
        "provider": { "@id": "https://merinabuilders.com/#localbusiness" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" }
        ]
      },
      {
        "@type": "Service",
        "name": "Church Construction",
        "description": "Expert architectural design, structural columns engineering, and grand design implementation for holy church landmarks.",
        "provider": { "@id": "https://merinabuilders.com/#localbusiness" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Thanjavur" },
          { "@type": "City", "name": "Kumbakonam" }
        ]
      }
    ]
  };

  return (
    <PageTransition>
      <SEO
        title="Merina Builders | Best Construction Company in Thanjavur & Kumbakonam"
        description="Merina Builders is a trusted construction company serving Thanjavur, Kumbakonam, and nearby areas. We specialize in commercial construction, renovation, project management, church construction, and AI-powered construction cost estimation."
        keywords="Construction Company Thanjavur, Builders Thanjavur, Commercial Construction, Construction Company Kumbakonam, Church Construction, Project Management, Construction Estimate, Building Contractors, Civil Contractors, Renovation Services"
        schema={homeSchema}
      />
      <main className="w-full relative">
        <h1 className="sr-only">Merina Builders | Best Construction Company in Thanjavur & Kumbakonam</h1>
        <HeroImageSequence />
        <TrustedBySection />
        <ServicesOverviewSection />
        <ProjectShowcaseSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </PageTransition>
  );
}

