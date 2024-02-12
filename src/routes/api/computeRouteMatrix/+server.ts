import { MAPS_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({}) {
	const res = await fetch(
		`https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix?key=${MAPS_API_KEY}`,
		{
			method: 'POST',
			body: JSON.stringify({
				origins: [
					{
						waypoint: {
							address: 'ION Orchard'
						}
					}
				],
				destinations: [
					{
						waypoint: {
							address: 'Kuula lumpur'
						}
					}
				],
				travelMode: 'DRIVE'
			}),
			headers: {
				'X-Goog-FieldMask': 'localizedValues.staticDuration,staticDuration'
			}
		}
	);
	// [
	//     {
	//       staticDuration: '14784s',
	//       localizedValues: { staticDuration: { text: '4 hours 6 mins' } }
	//     }
	//   ]

	const data = await res.json();
	console.dir(data, { depth: null });
	return json(data);
}
