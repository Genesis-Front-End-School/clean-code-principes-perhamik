import {destroyCookie, parseCookies, setCookie} from 'nookies'

interface IStorageProvider {
	get(name: string): string
	set(name: string, value: string): void
	remove(name: string): void
}

class NookiesStorageProvider implements IStorageProvider {
	constructor() {}

	private findProperty(cookies: {[key: string]: string}, name: string): string {
		const search = Object.entries(cookies || {}).find(([key, _]) => key === name)
		if (!search) return ''

		const [_, value] = search
		return value
	}

	public get(name: string): string {
		const cookies = parseCookies()
		return this.findProperty(cookies, name)
	}

	public set(name: string, value: string): void {
		setCookie(null, name, value, {
			maxAge: 14 * 24 * 60 * 60,
			path: '/',
			secure: true,
		})
	}

	public remove(name: string): void {
		destroyCookie(null, name)
	}
}
class Storage {
	private static instance: Storage
	private provider: IStorageProvider

	private constructor() {
		this.provider = new NookiesStorageProvider()
	}

	public static getInstance(): Storage {
		if (!Storage.instance) {
			Storage.instance = new Storage()
		}

		return Storage.instance
	}

	public get(name: string) {
		return this.provider.get(name)
	}

	public set(name: string, value: string) {
		return this.provider.set(name, value)
	}

	public remove(name: string) {
		return this.provider.remove(name)
	}
}

export default Storage.getInstance()
