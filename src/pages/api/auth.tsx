import {NextApiRequest, NextApiResponse} from 'next'

import {API_AUTH_PATH, API_PATH} from '@/src/services/const'
import Storage from '@/src/services/store'

const API_ENDPOINT = `${API_PATH}/${API_AUTH_PATH}`

type AuthResponseData = {
	token: string
}

export async function authenticateAsGuest(req: NextApiRequest, res: NextApiResponse) {
	try {
		const response = await fetch(API_ENDPOINT)
		const data = (await response.json()) as AuthResponseData

		Storage.set('token', data.token)

		res.json({success: true, token: Storage.get('token')})
	} catch (error) {
		console.error(error)
		res.status(500).json({success: false})
	}
}

export default authenticateAsGuest
