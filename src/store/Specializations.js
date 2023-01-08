
export async function getSpecializations() {
	let s = await (await fetch('https://api.hh.ru/professional_roles')).json()

	return s
}