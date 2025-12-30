<template>
	<div class="container min-w-xs px-3 lg:px-10 pt-[60px] grid-cols-[100%] pb-10 text-mine-shaft grid items-center min-h-screen overflow-hidden relative mx-auto">
		<div class="grid gap-10 grid-cols-[100%] max-w-max mx-auto items-center lg:grid-cols-[auto,1fr]">
			<div class="max-w-max mx-auto grid grid-cols-[100%]">
				<h1
					ref="h1"
					class="grid grid-cols-[100%] text-center justify-items-center mx-auto max-w-max text-[28px] sm:text-[34px] md:text-[44px] xl:text-[60px]"
				>
					<span class="text-left">Твой путь тернист, ведь ты </span>
					<span
						ref="span"
						class="uppercase self-center text-center leading-none w-max transition-all font-black"
						v-text="word"
					></span>
				</h1>
				<div class="relative">
					<input
						class="font-jost h-10 mt-3 sm:text-base lg:text-lg bg-transparent w-full border-b border-thunder placeholder:text-thunder focus:outline-none focus-visible:border-mine-shaft text-sm leading-none pb-2 pt-4 text-thunder"
						type="text"
						placeholder="Введите что душе угодно, а мы подскажем"
						v-model="inputValue"
						@change="searchResult.length ? '' : setProfession(inputValue)"
					>
					<transition
						enter-from-class="opacity-0"
						enter-to-class="opacity-100"
						leave-from-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<div v-if="inputValue && searchResult.length" class="transition-all z-[1] after:pointer-events-none before:pointer-events-none absolute top-full bg-white no-scrollbar max-h-32 after:bg-gradient-to-t before:bg-gradient-to-b before:from-white before:h-8 before:block before:sticky before:top-0 before:w-full overflow-y-auto w-full after:from-white after:h-8 after:sticky after:bottom-0 after:w-full after:block">
							<ul class="p-4 -my-8">
								<li
									v-for="item in searchResult"
								>
									<button
										class="transition-all focus:outline-none outline-none focus-visible:underline overflow-hidden text-left w-full font-bold"
										@click="setProfession(item)"
									>
										{{ item }}
									</button>
								</li>
							</ul>
						</div>
					</transition>
				</div>
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
					:alt="`Твой путь тернист, ведь ты ${word}`"
				>
				<div class="bg-white invisible group-hover:visible rounded-2xl p-5 text-2xl absolute no-scrollbar overflow-y-auto inset-0 transition-all opacity-0 group-hover:opacity-100">
					<p
						class="text-4xl mb-4 text-center font-black"
					>Выберите профессию или слово</p>
					<ul
						class="text-center grid grid-cols-[100%] gap-4"
					>
						<li
							v-for="(item, key) in [
								{
									title: 'Профессии',
									list: professions
								},
								{
									title: 'Остальные слова',
									list: words
								}
							]"
							:key="item"
							class=""
						>
							<p class="font-black">{{ item.title }}</p>							
							<ul class="text-base justify-center flex flex-wrap -mt-2 -ml-2">
								<li
									v-for="(el, key, i) in item.list"
									:key="key"
									class="mt-2 ml-2"
								>
									<button
										@click="setProfession(key)"
										class="text-left hover:underline"
									>
										{{ key }}{{ i + 1 === Object.keys(item.list).length ? '.' : ','}}
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
					v-text="word"
				></span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, watch, computed, nextTick } from 'vue'
	import { fitText } from '@tools/fitText'
	import useMedia from '@tools/media'
	import { getSpecializations, getWords } from '@store/Specializations'

	const {
		sm,
		md,
		lg,
		xl
	} = useMedia()
	const word = ref('программист')
	const copied = ref(false)
	const h1 = ref(null)
	const span = ref(null)
	const textEl = ref(null)
	const parentEl = ref(null)
	const inputValue = ref('')
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
	const image = ref('dog')

	const professions = ref({})
	const words = ref({})
	const searchResult = computed(() => {
		const list = [...Object.keys(professions.value), ...Object.keys(words.value).filter(i => !(words.value[i].profession))]

		return list.filter(i => i.includes(inputValue.value.toLowerCase()))
	})

	const setProfession = (p: string = '') => {
		textEl.value.style['font-size'] = `16px`
		span.value.style['font-size'] = `16px`
		setTimeout(async () => {
			if(p) {
				word.value = p
			}
			await nextTick()
			fitText(h1.value, span.value, {
				max: 150
			})
			fitText(parentEl.value, textEl.value)
		}, 150)
		image.value = randomImage()
		inputValue.value = ''
	}

	const copy = () => {
		let url = new URL(window.location.toString())
		url.searchParams.set('w', word.value)
		history.pushState(word.value, null, url)
		window.navigator.clipboard.writeText(url.toString())
		copied.value = true
		setTimeout(() => {
			copied.value = false
		}, 3000)
	}

	watch([
		sm,
		md,
		lg,
		xl
	], () => {
		setProfession()
	})
	watch(word, () => {
		if(word.value) {
			localStorage.setItem('w', word.value)
		} else {
			word.value = '....'
		}
	})

	const bl = [
		// 27
	]

	onMounted(async () => {		
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop as string),
		}) as {
			w?: string,
			profession?: string,
			word?: string
		}
		const profession = params.w || params.profession || params.word
		if(profession) {
			setProfession(profession)
		} else if(localStorage.getItem('w') || localStorage.getItem('profession')) {
			setProfession(localStorage.getItem('w') || localStorage.getItem('profession'))
		} else {
			setProfession()
		}
		const { categories } = await getSpecializations()
		const response = await getWords()

		words.value = response
		professions.value = categories
			.filter(i => !bl.includes(Number(i.id)))
			.reduce((obj, i) => {
				let ps = i.roles.filter(i => /ист$/.test(i.name))
				ps.forEach(p => {
					let key = p.name.toLowerCase()
					if(!obj[key]) {
						if(words.value[key]) {
							obj[key] = words.value[key]
							words.value[key] = {
								...words.value[key],
								profession: true
							}
						} else {
							obj[key] = false
						}
					}
				
				})
				return obj
			}, {})
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