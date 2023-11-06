
export async function getSpecializations() {
	let s = await (await fetch('https://api.hh.ru/professional_roles')).json()

	return s
}

export async function getWords() {
	let s = await (await fetch('/words.json')).json()

	return s
}