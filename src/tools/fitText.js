
export function fitText(parent, text, options = {}) {
	const parentWidth = parent.getBoundingClientRect().width
    const { width, height } = text.getBoundingClientRect()
	const newHeight = parentWidth / (width / height)
	const style = window.getComputedStyle(text, null).getPropertyValue('font-size');
	const currentFontSize = parseFloat(style);
	text.style['font-size'] = `${newHeight / (height / currentFontSize)}px`
}