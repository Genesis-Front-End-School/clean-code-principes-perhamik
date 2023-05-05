export const delay = (ms: number = 500): Promise<boolean> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, ms)
	})

export const delayedAction = (ms: number, func: Function) => delay(ms).then(() => func())
