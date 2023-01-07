const sizes = [
	"(min-width: 640px)",
	"(min-width: 768px)",
	"(min-width: 1024px)",
	"(min-width: 1280px)",
]

export function checkSize(size, f) {
	const m = window.matchMedia(size);

	try {
		m.addEventListener("change", function () {
			if(f) f()
		});
	} catch (e1) {
		try {
			m.addListener((e) => {
				if(f) f()
			});
		} catch (e2) {
			console.error(e2);
		}
	}
}

export function checkSizes(f) {
	sizes.forEach(size => {
		checkSize(size, f)
	})
}
