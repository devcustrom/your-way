<template>
	<div class="container px-3 lg:px-10 pt-[60px] pb-10 text-mine-shaft grid items-center min-h-screen overflow-hidden relative mx-auto">
		<div class="grid gap-10 items-center grid-cols-[1fr,auto]">
			<div class="w-max mx-auto">
				<h1
					ref="h1"
					class="grid text-center justify-items-center mx-auto max-w-max text-[28px] sm:text-[34px] md:text-[44px] lg:text-[60px]"
				>
					<span class="text-left">Твой путь тернист, ведь ты </span>
					<span
						ref="span"
						class="uppercase self-center text-center leading-none w-max transition-all font-black"
						v-text="profession"
					></span>
				</h1>
				<input
				class="font-jost h-10 mt-3 bg-transparent w-full border-b border-thunder placeholder:text-thunder focus:outline-none focus-visible:border-mine-shaft	 text-sm leading-none pb-2 pt-4 text-thunder"
					type="text"
					placeholder="Введите профессию..."
					v-model="inputValue"
					@change="setProffesion(inputValue)"
				>
			</div>
			<div class="aspect-square group relative sm:w-[220px] md:w-[320px] lg:w-[500px]">
				<img
					class="w-full h-full object-contain transition-all group-hover:opacity-0"
					:class="image ? '' : 'opacity-0'"
					:src="image"
					:alt="`Твой путь тернист, ведь ты ${profession}`"
				>
				<div class="bg-white rounded-2xl p-5 text-2xl absolute no-scrollbar overflow-y-auto inset-0 transition-all opacity-0 group-hover:opacity-100">
					<ul
						class="-mt-2 -ml-2 flex flex-wrap justify-center"
					>
						<li
							v-for="(item, i) in professions"
							:key="item"
							class="ml-2 mt-2"
						>
							<button
								@click="setProffesion(item)"
							>
								{{ item }}{{ i + 1 === professions.length ? '.' : ',' }}
							</button>
						</li>
					</ul>
				</div>
			</div>
			<div 
				class="absolute sm:top-full top-1/2 inset-x-3 -translate-y-1/2 sm:-translate-y-full z-[-1] block text-center opacity-20"
				ref="parentEl"
			>
				<span
					ref="textEl"
					class="leading-none uppercase text-malibu transition-all font-black"
					v-text="profession"
				></span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue'
	import { fitText } from '@tools/fitText'

	const profession = ref('программист')
	const h1 = ref(null)
	const span = ref(null)
	const textEl = ref(null)
	const parentEl = ref(null)
	const inputValue = ref('')
	const sizeSVG = ref(80)
	const randomImage = () => {
		const images = [
			'/images/dog.svg',
			'/images/orange.svg',
			'/images/2023.svg'
		]

		return images[Math.floor(Math.random() * images.length)]
	}
	const image = ref('')

	const professions = [
		'программист',
		'пианист',
		'баянист',
		'флорист',
		'вокалист'
	]

	const setProffesion = (p) => {
		textEl.value.style['font-size'] = `16px`
		span.value.style['font-size'] = `16px`
		setTimeout(() => {
			profession.value = p
			setTimeout(() => {
				fit()
			}, 1)
		}, 150)
		image.value = randomImage()
	}

	watch(profession, () => {
		if(profession.value) {
			localStorage.setItem('profession', profession.value)
		}
	})

	const fit = () => {
		fitText(h1.value, span.value)
		fitText(parentEl.value, textEl.value)
	}
	onMounted(() => {
		window.addEventListener('resize', () => { fit() }, true)
		
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		})
		
		if(params.profession) {
			setProffesion(params.profession)
		} else if(localStorage.getItem('profession')) {
			setProffesion(localStorage.getItem('profession'))
		} else {
			fit()
		}
	})
</script>

<style>
.no-scrollbar {
	scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
	@apply hidden;
}
</style>