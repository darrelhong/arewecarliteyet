<section class="mx-auto mt-4 w-full max-w-3xl sm:mb-4">
	<div class="mx-4">
		<h1 class="text-5xl font-bold">Are we car lite yet?</h1>
	</div>
</section>

<section class="mx-auto mb-16 mt-8 w-full max-w-3xl">
	<div class="mx-4">
		<form class="flex flex-wrap gap-4">
			<div class="grid flex-1 gap-1">
				<label class="text-3xl font-semibold" for="from">From</label>
				<input
					size={28}
					type="text"
					class="rounded-lg border border-2 border-neutral-400 p-2"
					placeholder="ION Orchard"
					id="from"
					name="from"
				/>
			</div>
			<div class="grid flex-1 gap-1">
				<label class="text-3xl font-semibold" for="to">To</label>
				<input
					size={28}
					type="text"
					class="rounded-lg border border-2 border-neutral-400 p-2"
					placeholder="IKEA Tampines"
					id="to"
					name="to"
				/>
			</div>
		</form>
	</div>
</section>

<section class="mx-auto w-full max-w-3xl">
	<div class="mx-4">
		<div class="flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
			<div class="grid gap-1">
				<h3 class="text-3xl font-semibold">By car 🚙</h3>
				<p class="text-2xl">23 mins</p>
			</div>
			<div class="grid gap-1">
				<h3 class="text-3xl font-semibold">By public tansport 🚇</h3>
				<p class="text-2xl">59 mins</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto mt-8 w-full max-w-3xl">
	<div class="mx-4 grid gap-2">
		<h2 class="text-4xl font-bold">Unfortunately, no</h2>
		<p class="text-xl">
			It is <strong>36 mins faster</strong> to drive than to take public transport
		</p>
	</div>
</section>
