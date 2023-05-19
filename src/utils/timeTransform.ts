export const transformDuration = (seconds: number): string => {
	const duration = Math.abs(parseInt(`${seconds}`))
	const _h = Math.floor(duration / 3600)
	const _m = Math.floor((duration - _h * 3600) / 60)
	const _s = duration % 60
	const h = _h > 0 ? `${_h}` : ''
	const m = _m < 10 ? `0${_m}` : `${_m}`
	const s = _s < 10 ? `0${_s}` : `${_s}`
	return [h, m, s].filter((item) => !!item).join(':')
}
