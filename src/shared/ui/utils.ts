function clearArrayFromUndefines<T>(arr: Array<T | undefined>): Array<T> {
	return arr.filter((item) => !!item) as Array<T>
}

const mergeNumberArrayOrStringArray = (str: Array<number | string | undefined>): string => {
	return clearArrayFromUndefines(str)
		.map((item) => `${item}`)
		.join(' ')
}

export const mergeWithAdditionalClassName = (
	srcClass: string,
	additional: string | undefined | Array<number | string | undefined>,
): string => {
	if (!additional) return srcClass

	if (typeof additional === 'string') return `${srcClass} ${additional}`

	return `${srcClass} ${mergeNumberArrayOrStringArray(additional)}`
}
