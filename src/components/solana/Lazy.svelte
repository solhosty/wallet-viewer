<script>
	import { onMount } from 'svelte';

	export let options = {};
	let target;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.dispatchEvent(new CustomEvent('intersect'));
					observer.unobserve(entry.target);
				}
			});
		}, options);

		observer.observe(target);

		return () => observer.disconnect();
	});
</script>

<div class="loading" bind:this={target}>
	<slot />
</div>
