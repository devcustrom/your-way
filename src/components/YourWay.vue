<template>
	<div class="container px-3 lg:px-10 pt-[60px] pb-10 text-mine-shaft grid items-center min-h-screen relative mx-auto">
		<div class="grid gap-10 items-center">
			<div class="sm:col-span-2 w-max mx-auto">
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
					@change="setProffesion"
				>
			</div>
			<div class="aspect-square">
				<img
					class="w-full h-full object-contain"
					:src="randomImage()"
					:alt="`Твой путь тернист, ведь ты ${profession}`"
				>
			</div>
			<div 
				class="absolute sm:static sm:col-span-3 top-1/2 inset-x-3 -translate-y-1/2 z-[-1] block text-center opacity-20"
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

	const profession = ref('ПРОГРАММИСТ')
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

	const setProffesion = () => {
		textEl.value.style['font-size'] = `16px`
		span.value.style['font-size'] = `16px`
		setTimeout(() => {
			profession.value = inputValue.value
			setTimeout(() => {
				fit()
			}, 1)
		}, 150)
	}

	const fit = () => {
		fitText(h1.value, span.value)
		fitText(parentEl.value, textEl.value)
	}
	onMounted(() => {
		window.addEventListener('resize', () => { fit() }, true)
		fit()
	})
</script>