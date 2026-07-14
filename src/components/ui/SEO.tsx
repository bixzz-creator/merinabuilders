import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, keywords, schema }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update Canonical Link
    const canonicalUrl = `https://merinabuilders.com${location.pathname === '/' ? '' : location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 5. Update Open Graph (og:title, og:description, og:url, og:type, og:image)
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:type': 'website',
      'og:image': 'https://merinabuilders.com/og-image.png',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // 6. Update Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image)
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': 'https://merinabuilders.com/twitter-image.png',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });

    // 7. Inject JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (scriptTag) {
      scriptTag.remove();
    }

    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    // 8. Generate and Inject Breadcrumb Schema
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://merinabuilders.com"
      }
    ];

    pathSegments.forEach((segment, index) => {
      const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      const segmentUrl = `https://merinabuilders.com/${pathSegments.slice(0, index + 1).join('/')}`;
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": segmentUrl
      });
    });

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };

    const breadcrumbScriptId = 'json-ld-breadcrumb';
    let breadcrumbScriptTag = document.getElementById(breadcrumbScriptId) as HTMLScriptElement;
    if (breadcrumbScriptTag) {
      breadcrumbScriptTag.remove();
    }

    breadcrumbScriptTag = document.createElement('script');
    breadcrumbScriptTag.id = breadcrumbScriptId;
    breadcrumbScriptTag.type = 'application/ld+json';
    breadcrumbScriptTag.innerHTML = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScriptTag);

    // 9. Fire GA4 page_view on SPA route change
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: `https://merinabuilders.com${location.pathname}`,
        page_path: location.pathname,
      });
    }
  }, [title, description, keywords, location.pathname, schema]);

  return null;
}

