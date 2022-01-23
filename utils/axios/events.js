import axios from 'redaxios'

const { NEXT_PUBLIC_STRAPI_API_URL } = process.env

export const getEvents = async (params = null) => {
  const { data } = await axios
    .get(`${NEXT_PUBLIC_STRAPI_API_URL}/events`, {
      params,
    })
    .catch((res) => {
      throw new Error(res.data.error)
    })
  return data
}

export const getEvent = async (id) => {
  const { data } = await axios
    .get(`${NEXT_PUBLIC_STRAPI_API_URL}/events/${id}`)
    .catch((res) => {
      throw new Error(res.data.error)
    })
  return data
}
