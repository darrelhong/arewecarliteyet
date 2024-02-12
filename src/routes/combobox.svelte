<script lang="ts">
	import { createCombobox, melt } from '@melt-ui/svelte';
	import debounce from 'lodash/debounce';
	import { fly } from 'svelte/transition';

	type Suggestion = {
		main_text: string;
		secondary_text: string;
	};

	const initialSuggestions: Suggestion[] = [
		{ main_text: 'Gardens by the Bay', secondary_text: 'Marina Gardens Drive' },
		{ main_text: 'Marina Bay Sands', secondary_text: 'Bayfront Avenue' },
		{ main_text: 'Botanic Gardens', secondary_text: 'Cluny Road' },
		{ main_text: 'Singapore Flyer', secondary_text: 'Raffles Avenue' },
		{ main_text: 'Ion Orchard', secondary_text: 'Orchard Road' },
		{ main_text: 'Changi Airport', secondary_text: 'Airport Boulevard' },
		{ main_text: 'Singapore Zoo', secondary_text: 'Mandai Lake Road' }
	];

	export let name: string;
	export let id: string;
	export let labelText: string;
	export let placeholder: string;

	const debouncedFetchSuggestions = debounce(async (input: string) => {
		const res = await fetch(`/api/autocomplete?input=${input}`);
		const data = await res.json();

		suggestions = data;
	}, 400);

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, selected }
	} = createCombobox<Suggestion>({
		forceVisible: true,
		ids: { label: id }
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	let suggestions: Suggestion[] = [];

	$: {
		if ($inputValue) {
			debouncedFetchSuggestions($inputValue);
		} else {
			suggestions = initialSuggestions;
		}
	}
</script>

<div class="grid flex-1 gap-1">
	<label class="text-3xl font-semibold" for={id} use:melt={$label}>{labelText}</label>
	<input
		autocomplete="off"
		size={28}
		type="text"
		class="rounded border border-2 border-neutral-400 p-2 focus-visible:outline-neutral-950"
		{placeholder}
		{id}
		{name}
		use:melt={$input}
	/>
	{#if $open}
		<ul
			class=" z-10 flex flex-col overflow-hidden rounded border border-2 border-neutral-950"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white p-1" tabindex="0">
				{#each suggestions as suggestion, index (index)}
					<li
						use:melt={$option({
							label: `${suggestion.main_text} ${suggestion.secondary_text}`.trim(),
							value: suggestion.main_text
						})}
						class="relative cursor-pointer scroll-my-2 rounded-md p-2 hover:bg-teal-200 data-[highlighted]:bg-teal-200 data-[disabled]:opacity-50"
					>
						<div>
							<span class="font-medium">{suggestion.main_text}</span>
							<span class="font-light opacity-75">{suggestion?.secondary_text}</span>
						</div>
					</li>
				{:else}
					<li class="relative cursor-pointer rounded-md py-1 px-2">No results found</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
