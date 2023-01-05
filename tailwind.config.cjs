/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				quam: 'Quam',
				jost: 'Jost'
			},
			colors: {
				anakiwa: '#ADE2FF',
				malibu: '#56C3FF',
				thunder: '#1F1B1F',
				'mine-shaft': '#282828'
			}
		},
	},
	plugins: [],
}
