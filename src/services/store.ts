import {destroyCookie, parseCookies, setCookie} from 'nookies'
import Cookies from 'universal-cookie'

interface IStorageProvider {
	get(name: string): string
	set(name: string, value: string): void
	remove(name: string): void
}

class LocalStorageProvider implements IStorageProvider {
	constructor() {}

	public get(name: string) {
		const value = localStorage.getItem(name)
		return !value ? '' : value
	}

	public set(name: string, value: string) {
		localStorage.setItem(name, value)
	}

	public remove(name: string) {
		localStorage.removeItem(name)
	}
}

class NookiesStorageProvider implements IStorageProvider {
	constructor() {}

	private findProperty(cookies: {[key: string]: string}, name: string): string {
		const search = Object.entries(cookies || {}).find(([key, value]) => key === name)
		if (!search) return ''

		const [key, value] = search
		return value
	}

	public get(name: string): string {
		const cookies = parseCookies()
		return this.findProperty(cookies, name)
	}

	public set(name: string, value: string): void {
		setCookie(null, name, value, {
			path: '/',
			secure: true,
		})
	}

	public remove(name: string): void {
		destroyCookie(null, name)
	}
}

class CookiesStorageProvider implements IStorageProvider {
	private cookies: Cookies

	constructor() {
		this.cookies = new Cookies()
	}

	public get(name: string): string {
		const value = this.cookies.get(name)
		return !value ? '' : value
	}

	public set(name: string, value: string): void {
		this.cookies.set(name, value, {
			path: '/',
			secure: true,
		})
	}

	public remove(name: string) {
		this.cookies.remove(name)
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
