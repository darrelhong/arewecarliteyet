import { MAPS_API_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const input = url.searchParams.get('input');
	if (!input) {
		return error(400, 'No input provided');
	}

	const mapsApiParams = new URLSearchParams({
		input: input,
		components: 'country:sg',
		key: MAPS_API_KEY
	});

	const res = await fetch(
		`https://maps.googleapis.com/maps/api/place/autocomplete/json?${mapsApiParams}`
	);
	const data: google.maps.places.AutocompleteResponse = await res.json();

	const ret = data?.predictions?.map((pred) => {
		return {
			main_text: pred.structured_formatting.main_text,
			secondary_text: pred.structured_formatting.secondary_text ?? ''
		};
	});

	return json(ret);
}
