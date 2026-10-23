import { site } from '../data/site';

export function createStructuredData(imageUrl: string, canonicalUrl: string) {
  const businessId = `${site.url}#business`;
  const websiteId = `${site.url}#website`;
  const serviceId = `${site.url}#driving-service`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        inLanguage: 'ja',
        publisher: { '@id': businessId },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: site.title,
        description: site.description,
        inLanguage: 'ja',
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
        mainEntity: { '@id': serviceId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
          width: 1200,
          height: 630,
          caption: 'スピードチングの軽トラックの随伴車',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: site.name,
        url: site.url,
        description: site.description,
        image: imageUrl,
        telephone: site.internationalPhone,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'JP',
          addressRegion: '大分県',
          addressLocality: '大分市',
          streetAddress: '下郡東',
          postalCode: site.postalCode,
        },
        areaServed: site.serviceArea,
        priceRange: `初乗り${site.initialFareText}`,
        paymentAccepted: site.payment,
        currenciesAccepted: site.initialFare.currency,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'スピードチングのサービス',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@id': serviceId } },
            { '@type': 'Offer', itemOffered: { '@id': `${site.url}#car-storage` } },
          ],
        },
        // Holiday/regular-closure precedence is not yet confirmed. Keep hours
        // in the visible text and description instead of inventing exceptions.
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'スピードチングの運転代行',
        serviceType: '運転代行',
        url: `${site.url}#area-price`,
        provider: { '@id': businessId },
        areaServed: site.serviceArea,
        description: `即対応エリア：${site.serviceArea}。初乗り${site.initialFareText}。${site.reservation}`,
      },
      {
        '@type': 'Service',
        '@id': `${site.url}#car-storage`,
        name: '車のお預かり',
        serviceType: '車のお預かり',
        url: `${site.url}#storage`,
        provider: { '@id': businessId },
        description: '車のお預かりの期間、料金、受け渡しについてはお電話でご相談ください。',
      },
    ],
  };
}

export function serializeStructuredData(value: ReturnType<typeof createStructuredData>) {
  // Prevent text content from ever terminating the JSON-LD script element.
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
