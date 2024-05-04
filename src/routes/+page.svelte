<script lang="ts">
	import { enhance } from '$app/forms';
	import Combobox from './combobox.svelte';

	export let form;

	let differenceMins = 36;

	$: {
		if (form) {
			if (form.drive?.staticDuration && form.transit?.staticDuration) {
				// remove trailing s from duration
				const differenceSecs =
					parseInt(form.transit.staticDuration.slice(0, -1)) -
					parseInt(form.drive.staticDuration.slice(0, -1));
				console.log(differenceSecs);

				differenceMins = Math.round(differenceSecs / 60);
			}
		}
	}
</script>

<section class="mx-auto mt-4 w-full max-w-3xl sm:mb-4">
	<div class="mx-4">
		<h1 class="text-5xl font-bold">Are we car lite yet?</h1>
	</div>
</section>

<section class="mx-auto mb-16 mt-8 w-full max-w-3xl">
	<div class="mx-4">
		<form
			method="POST"
			use:enhance={() => {
				return async ({ update }) => update({ reset: false });
			}}
		>
			<div class="flex flex-wrap gap-4">
				<Combobox name="from" id="from" labelText="From" placeholder="ION Orchard" />
				<Combobox name="to" id="to" labelText="To" placeholder="IKEA Tampines" />
			</div>
			<button
				class="mt-2 rounded bg-black px-4 py-2 font-semibold text-white outline-offset-2"
				type="submit">Compute</button
			>
		</form>
	</div>
</section>

<section class="mx-auto w-full max-w-3xl">
	<div class="mx-4">
		<div class="flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
			<div class="grid gap-1">
				<h3 class="text-3xl font-semibold">By car 🚙</h3>
				<p class="text-2xl">{form ? form.drive?.localizedValue : '23 mins'}</p>
			</div>
			<div class="grid gap-1">
				<h3 class="text-3xl font-semibold">By public tansport 🚇</h3>
				<p class="text-2xl">{form ? form.transit?.localizedValue : '59 mins'}</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto mt-8 w-full max-w-3xl">
	<div class="mx-4 grid gap-2">
		<h2 class="text-4xl font-bold">
			{#if differenceMins > 30}
				Not at all, no
			{:else if differenceMins > 20}
				Not really, no
			{:else if differenceMins > 10}
				Getting there
			{:else if differenceMins >= 0}
				Almost there
			{:else}
				Yes, and it's awesome
			{/if}
		</h2>
		<p class="text-xl">
			{#if differenceMins > 0}
				It is <strong>{differenceMins} mins faster</strong> to drive than to take public transport.
			{:else if differenceMins < 0}
				It is <strong>{differenceMins * -1} min faster</strong> to take public transport than to drive!
			{:else}
				It takes the <strong>same time</strong> to take public transport or drive.
			{/if}
		</p>
		<span
			class="mt-10 justify-self-start rounded border border-2 border-teal-700 p-2 font-medium text-teal-700"
			>Challenge: Try to achieve the smallest possible difference!</span
		>
	</div>
</section>
