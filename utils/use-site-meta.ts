import { useRouteLoaderData } from '@remix-run/react'
import type { loader as rootLoader } from '~/root'

export function useSiteMeta() {
  const data = useRouteLoaderData<typeof rootLoader>('root')
  if (!data?.SITE_META) {
    throw new Error(
      'No SITE_META found in root loader, but user is required by useSiteMeta.',
    )
  }
  return data.SITE_META
}
