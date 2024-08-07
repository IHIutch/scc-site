import axios from 'redaxios'
import invariant from 'tiny-invariant'
import z from 'zod'
import { getEnv } from 'utils/getEnv.server'
import { ImageFormat } from './posts.server'

const ZodEventData = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    lead: z.string().optional(),
    startingAt: z.string(),
    endingAt: z.string().nullable(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    featuredImage: z.object({
      data: z.object({
        id: z.number(),
        attributes: z.object({
          name: z.string(),
          alternativeText: z.string().nullable(),
          caption: z.string().nullable(),
          width: z.number(),
          height: z.number(),
          formats: z.object({
            thumbnail: ImageFormat.optional(),
            small: ImageFormat.optional(),
            medium: ImageFormat.optional(),
            large: ImageFormat.optional(),
          }),
          ext: z.string(),
          url: z.string().url(),
          hash: z.string(),
          size: z.number(),
          provider_metadata: z.object({
            public_id: z.string(),
            resource_type: z.string(),
          }),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      }).nullable(),
    }),
    seo: z.object({}).nullable(),
    location: z.object({
      id: z.number(),
      streetAddress: z.string(),
      city: z.string(),
      state: z.string(),
      googleMapsUrl: z.string().url(),
      zipCode: z.string(),
      title: z.string(),
    }).nullable(),
  }),
})

export const ZodEventSingle = z.object({
  data: ZodEventData,
})

export const ZodEventsArray = z.object({
  data: z.array(ZodEventData),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
})

export async function getEvents(params?: Record<string, any>) {
  const { PUBLIC_STRAPI_API_URL } = getEnv()
  const { data } = await axios
    .get(`${PUBLIC_STRAPI_API_URL}/events`, {
      params: {
        ...params,
        populate: '*',
      },
    })
    .catch((res) => {
      throw new Error(res.data.error)
    })

  const result = ZodEventsArray.safeParse(data)
  if (!result.success) {
    console.error(result.error)
  }

  invariant(result.data?.data, 'getEvents failed to return events')

  return result.data?.data
}

export async function getEvent(id: number) {
  const { PUBLIC_STRAPI_API_URL } = getEnv()
  const { data } = await axios
    .get(`${PUBLIC_STRAPI_API_URL}/events/${id}`, {
      params: {
        populate: '*',
      },
    })
    .catch((res) => {
      throw new Error(res.data.error)
    })

  const result = ZodEventSingle.safeParse(data)
  if (!result.success) {
    console.error(result.error)
  }

  invariant(result.data?.data, 'getEvent failed to return event')

  return result.data.data
}
