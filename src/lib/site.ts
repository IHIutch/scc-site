export const site = {
  title: 'Scajaquada Corridor Coalition',
  url: 'https://www.sccoalition.net',
  description:
    'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
  donate: 'https://www.paypal.com/donate?hosted_button_id=FNKWNMDKXRUZG',
  subscribe: 'https://eepurl.com/gnIkIv',
  facebook: 'https://www.facebook.com/sccbuffalo/',
  instagram: 'https://www.instagram.com/sccoalition/',
  twitter: 'https://twitter.com/RightSize198',
};

export function imageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') return undefined;
  const value = image as {
    src?: string;
    url?: string;
    id?: string;
    meta?: { storageKey?: string };
  };
  return (
    value.src ||
    value.url ||
    (value.meta?.storageKey
      ? `/_emdash/api/media/file/${value.meta.storageKey}`
      : undefined)
  );
}

export function formatDate(
  value: string | Date | null | undefined,
  time = false,
): string {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(time
      ? {
          weekday: 'long',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
        }
      : {}),
  }).format(new Date(value));
}

export function publicationDate(data: {
  published_date?: string | Date | null;
  publishedAt?: Date | null;
}): string | Date | null {
  return data.published_date || data.publishedAt || null;
}

export function newestFirst<
  T extends { data: Parameters<typeof publicationDate>[0] },
>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) =>
      new Date(publicationDate(b.data) || 0).valueOf() -
      new Date(publicationDate(a.data) || 0).valueOf(),
  );
}
import type { getEmDashEntry, EmDashCollections } from 'emdash';
export type SiteEntry<C extends keyof EmDashCollections> = NonNullable<
  Awaited<ReturnType<typeof getEmDashEntry<C>>>['entry']
>;
