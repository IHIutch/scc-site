import axios from 'redaxios'

const { NEXT_PUBLIC_STRAPI_API_URL } = process.env

export const getPosts = async (params = null) => {
  const { data } = await axios
    .get(`${NEXT_PUBLIC_STRAPI_API_URL}/posts`, {
      params,
    })
    .catch((res) => {
      throw new Error(res.data.error)
    })
  return data
}

export const getPost = async (id) => {
  const { data } = await axios
    .get(`${NEXT_PUBLIC_STRAPI_API_URL}/posts${id}`)
    .catch((res) => {
      throw new Error(res.data.error)
    })
  return data
}
