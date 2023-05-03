export function lazyLoad(node: Element) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				const src = img.getAttribute('data-src');

				img.setAttribute('src', src);
				img.classList.add('fade-in');

				observer.disconnect();
			}
		});
	});

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
