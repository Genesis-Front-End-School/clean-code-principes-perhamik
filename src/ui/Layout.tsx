import type {ComponentProps} from './types'
import {mergeWithAdditionalClassName} from './utils'

type ColProps = ComponentProps & {
	col?: IntRange<1, 12>
	'col-sm'?: IntRange<1, 12>
	'col-md'?: IntRange<1, 12>
	'col-lg'?: IntRange<1, 12>
}

export const Row = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName('row', className)}>{children}</div>
}

export const Col = ({children, className, ...props}: ColProps) => {
	const cols = [props.col, props['col-sm'], props['col-md'], props['col-lg']]
	return <div className={mergeWithAdditionalClassName('col', [className, ...cols])}>{children}</div>
}
