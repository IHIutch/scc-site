import axios from 'redaxios'
import invariant from 'tiny-invariant'
import { getEnv } from 'utils/getEnv.server'
import { z } from 'zod'

export const ImageFormat = z.object({
  ext: z.string(),
  url: z.string().url(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  path: z.string().nullable(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  provider_metadata: z.object({
    public_id: z.string(),
    resource_type: z.string(),
  }),
})

const ZodPostData = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    lead: z.string().optional(),
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
  }),
})

export const ZodPostSingle = z.object({
  data: ZodPostData,
})

export const ZodPostsArray = z.object({
  data: z.array(ZodPostData),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
})

export async function getPosts(params?: Record<string, any>) {
  const { PUBLIC_STRAPI_API_URL } = getEnv()
  const { data } = await axios
    .get(`${PUBLIC_STRAPI_API_URL}/posts`, {
      params: {
        ...params,
        populate: '*',
      },
    })
    .catch((res) => {
      throw new Error(`API Error: ${res?.data?.error?.message}`)
    })

  const result = ZodPostsArray.safeParse(data)
  if (!result.success) {
    console.error(result.error.issues.map(i => ({
      ...i,
      path: i.path.join(','),
    })))
  }

  invariant(result.data?.data, 'getPosts failed to return posts')

  return result.data?.data
}

export async function getPost(id: number) {
  const { PUBLIC_STRAPI_API_URL } = getEnv()
  const { data } = await axios
    .get(`${PUBLIC_STRAPI_API_URL}/posts/${id}`, {
      params: {
        populate: '*',
      },
    })
    .catch((res) => {
      throw new Error(`API Error: ${res?.data?.error?.message}`)
    })

  const result = ZodPostSingle.safeParse(data)
  if (!result.success) {
    console.error(result.error)
  }

  invariant(result.data?.data, 'getPost failed to return post')

  return result.data.data
}
