<script>
	import { fade } from 'svelte/transition';
	let modalOpen = false;
	function toggleModal() {
		modalOpen = !modalOpen;
	}
	import '../shared/styles.scss';
</script>

<button class="wallet-modal-btn" on:click={toggleModal}>
	<h2>
		Open in Wallet App 
	</h2> </button
>
{#if modalOpen}
	<div class="modal-overlay" />
	<div class="modal" in:fade>
		<div class="modal-header">
			<h2 class="menu-title">Choose Wallet</h2>
		</div>
		<div class="modal-body">
			<a
				href="https://phantom.app/ul/browse/https%3A%2F%2Fminion-ui.vercel.app%2Fhome?ref=https%3A%2F%2Fminion-ui.vercel.app%2Fhome"
				rel="noreferrer"
				target="_blank"
			>
				<button class="page-button"> <h2>Phantom</h2></button>
			</a>
			<a
				href="https://solflare.com/ul/browse/https%3A%2F%2Fminion-ui.vercel.app%2Fhome?ref=https%3A%2F%2Fminion-ui.vercel.app%2Fhome"
				rel="noreferrer"
				target="_blank"
			>
				<button class="page-button mb-4"> <h2>Solflare</h2></button>
			</a>
			<button class="close" on:click={toggleModal}
				><img src="/images/shared/close.svg" alt="" /></button
			>
		</div>
	</div>
{/if}

<style>
	.close {
		align-self: center;
		left: 40%;
		border: none;
		width: 50px;
		position: relative;
	}
	.menu-title {
		text-align: center;
	}

	/* Add your CSS styles here */
	.modal {
		background-image: radial-gradient(rgb(105, 151, 212), rgb(116, 152, 231));
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		z-index: 1000;
		width: 300px;
		align-items: center;
		align-content: center;
		border-radius: 10px;
	}

	.modal-header {
		background-image: radial-gradient(rgb(105, 151, 212), rgb(116, 152, 231));
		padding: 10px;
		width: 83%;
		margin: auto;
		border-bottom: 1px solid #ddd;
		border-radius: 10px;
		border: 8px white solid;
	}
	.wallet-modal-btn {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}
	button {
		background-color: transparent;
		border-radius: 15px;
		border: 2px white solid;
		display: flex;
		margin: auto;
		margin-top: 5%;
		flex-direction: column;
		width: 300px;
		padding: 10px;
	}
	.modal-body {
		background-image: radial-gradient(rgb(105, 151, 212), rgb(116, 152, 231));
		padding: 20px;
		border-radius: 20px;
	}
	.page-button {
		width: 100%;
		height: 50px;
		border-radius: 20px;
		background-color: transparent;
		justify-content: center;
		margin: auto;
		border: 6px white solid;
		margin-bottom: 4%;
	}
	.page-button:hover {
		background-color: rgb(71, 67, 134);
	}
</style>
