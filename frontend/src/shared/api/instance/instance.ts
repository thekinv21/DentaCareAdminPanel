import axios from 'axios'

import { getAccessToken } from '../token/Token'

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
})
