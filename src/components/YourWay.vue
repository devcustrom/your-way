<template>
	<div class="container px-3 lg:px-10 pt-[60px] grid-cols-[100%] pb-10 text-mine-shaft grid items-center min-h-screen overflow-hidden relative mx-auto">
		<div class="grid gap-10 grid-cols-[100%] max-w-max mx-auto items-center lg:grid-cols-[auto,1fr]">
			<div class="max-w-max mx-auto">
				<h1
					ref="h1"
					class="grid grid-cols-[100%] text-center justify-items-center mx-auto max-w-max text-[28px] sm:text-[34px] md:text-[44px] xl:text-[60px]"
				>
					<span class="text-left">Твой путь тернист, ведь ты </span>
					<span
						ref="span"
						class="uppercase self-center text-center leading-none w-max transition-all font-black"
						v-text="profession"
					></span>
				</h1>
				<input
				class="font-jost h-10 mt-3 sm:text-base lg:text-lg bg-transparent w-full border-b border-thunder placeholder:text-thunder focus:outline-none focus-visible:border-mine-shaft text-sm leading-none pb-2 pt-4 text-thunder"
					type="text"
					placeholder="Введите что душе угодно..."
					v-model="inputValue"
					@change="setProffesion(inputValue)"
				>
				<transition
					enter-from-class="max-h-0"
					enter-to-class="max-h-[26px]"
					leave-from-class="max-h-[26px]"
					leave-to-class="max-h-0"
				>
					<button
						@click="copy()"
						class="transition-all focus:outline-none outline-none focus-visible:underline overflow-hidden border border-t-0 border-thunder px-4 w-full font-bold"
					>
						<transition
							enter-from-class="opacity-0"
							enter-to-class="opacity-100"
							leave-from-class="opacity-100"
							leave-to-class="opacity-0"
							mode="out-in"
						>
							<span class="transition-all" v-if="copied">
								Ссылка скопированна
							</span>
							<span class="transition-all" v-else>
								Поделиться
							</span>
						</transition>
					</button>
				</transition>
			</div>
			<div class="aspect-square group relative lg:w-[350px] xl:w-[500px]">
				<img
					class="w-full h-full object-contain transition-all group-hover:opacity-0"
					:class="image ? '' : 'opacity-0'"
					:src="`/images/${image}.svg`"
					:alt="`Твой путь тернист, ведь ты ${profession}`"
				>
				<div class="bg-white invisible group-hover:visible rounded-2xl p-5 text-2xl absolute no-scrollbar overflow-y-auto inset-0 transition-all opacity-0 group-hover:opacity-100">
					<p class="text-4xl mb-4 text-center font-black">Выберите проффессию</p>
					<ul
						class="text-center grid grid-cols-[100%] gap-4"
					>
						<li
							v-for="item in professions"
							:key="item.id"
							class=""
						>
							<p class="font-black">{{ item.name }}</p>							
							<ul class="text-base justify-center flex flex-wrap -mt-2 -ml-2">
								<li
									v-for="(role, i) in item.roles"
									:key="role.id"
									class="mt-2 ml-2"
								>
									<button
										@click="setProffesion(role.name)"
										class="text-left hover:underline"
									>
										{{ role.name }}{{ i + 1 === item.roles.length ? '.' : ','}}
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div 
				class="absolute lg:top-full top-1/2 inset-x-3 -translate-y-1/2 lg:-translate-y-full z-[-1] block text-center opacity-20"
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
	import { checkSizes } from '@tools/media'
	import { getSpecializations } from '@store/Specializations.js'

	const profession = ref('программист')
	const copied = ref(false)
	const h1 = ref(null)
	const span = ref(null)
	const textEl = ref(null)
	const parentEl = ref(null)
	const inputValue = ref('')
	const sizeSVG = ref(80)
	const randomImage = () => {
		const images = [
			'dog',
			'goose',
			'hamster',
			'hedgehog',
			'lion',
			'macaque',
			'penguin',
			'pig',
			'rabbit',
			'turtle'
		]

		return images[Math.floor(Math.random() * images.length)]
	}
	const image = ref('')

	const professions = ref([])

	const setProffesion = (p) => {
		textEl.value.style['font-size'] = `16px`
		span.value.style['font-size'] = `16px`
		setTimeout(() => {
			if(p) {
				profession.value = p
			}
			setTimeout(() => {
				fitText(h1.value, span.value, {
					max: 150
				})
				fitText(parentEl.value, textEl.value)
			}, 1)
		}, 150)
		image.value = randomImage()
	}

	const copy = () => {
		let url = new URL(window.location)
		url.searchParams.set('profession', profession.value)
		history.pushState(profession.value, null, url)
		window.navigator.clipboard.writeText(url)
		copied.value = true
		setTimeout(() => {
			copied.value = false
		}, 3000)
	}

	watch(profession, () => {
		if(profession.value) {
			localStorage.setItem('profession', profession.value)
		} else {
			profession.value = '....'
		}
	})

	const bl = [27]

	onMounted(async () => {
		checkSizes(setProffesion)
		
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		})
		
		if(params.profession) {
			setProffesion(params.profession)
		} else if(localStorage.getItem('profession')) {
			setProffesion(localStorage.getItem('profession'))
		} else {
			setProffesion()
		}
		const { categories } = await getSpecializations()
		professions.value = categories.filter(i => {
			return !bl.includes(Number(i.id))
		})
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