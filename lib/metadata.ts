import type { Metadata } from 'next';

export const SITE_NAME = 'Sacrament Meeting Tracker';
export const SITE_DESCRIPTION =
  'Plan, publish, and review sacrament meeting agendas for your ward.';

export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Sacrament Meeting Tracker agenda overview',
};

export function createPageMetadata(
  title: string,
  description: string,
  noIndex = false,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
