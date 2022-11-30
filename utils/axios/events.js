import axios from 'redaxios'

const { PUBLIC_STRAPI_API_URL } = process.env

export const getEvents = async (params = null) => {
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
  return data
}

export const getEvent = async (id) => {
  const { data } = await axios
    .get(`${PUBLIC_STRAPI_API_URL}/events/${id}`, {
      params: {
        populate: '*',
      },
    })
    .catch((res) => {
      throw new Error(res.data.error)
    })
  return data
}
