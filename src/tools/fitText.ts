export function fitText(parent: HTMLElement, text: HTMLElement, options: {
	max?: number
} = {}) {
	const parentWidth = parent.getBoundingClientRect().width
    const { width, height } = text.getBoundingClientRect()
	const newHeight = parentWidth / (width / height)
	const style = window.getComputedStyle(text, null).getPropertyValue('font-size');
	const currentFontSize = parseFloat(style);
	const newFontSize = newHeight / (height / currentFontSize)
	const {
		max
	} = options
	text.style['font-size'] = `${ max && newFontSize > max ? max : newFontSize}px`
}
