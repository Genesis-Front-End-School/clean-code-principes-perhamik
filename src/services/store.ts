import {destroyCookie, parseCookies, setCookie} from 'nookies'

interface IStorage {
	get(name: string): string
	set(name: string, value: string): void
}
interface IStorageProvider extends IStorage {
	remove(name: string): void
}

type ParsedCookies = {[key: string]: string}

class NookiesStorageProvider implements IStorageProvider {
	constructor() {}

	private findProperty(cookies: ParsedCookies, name: string): string {
		const search = Object.entries(cookies || {}).find(([key, _]) => key === name)
		if (!search) return ''

		const [_, value] = search
		return value
	}

	public get(name: string): string {
		const cookies: ParsedCookies = parseCookies()
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
export class Storage implements IStorage {
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

	public get(name: string): string {
		return this.provider.get(name)
	}

	public set(name: string, value: string): void {
		this.provider.set(name, value)
	}

	public remove(name: string): void {
		this.provider.remove(name)
	}
}

export default Storage.getInstance()
