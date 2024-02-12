import { MAPS_API_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const from = formData.get('from');
		const to = formData.get('to');

		if (!from || !to) {
			return fail(400, {});
		}

		const getPromise = (travelMode: 'DRIVE' | 'TRANSIT') =>
			fetch(
				`https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix?key=${MAPS_API_KEY}`,
				{
					method: 'POST',
					body: JSON.stringify({
						origins: [
							{
								waypoint: {
									address: to
								}
							}
						],
						destinations: [
							{
								waypoint: {
									address: from
								}
							}
						],
						travelMode: travelMode
					}),
					headers: {
						'X-Goog-FieldMask': 'localizedValues.staticDuration,staticDuration'
					}
				}
			);

		const [driveRes, transitRes] = await Promise.all([getPromise('DRIVE'), getPromise('TRANSIT')]);

		const [driveData, transitData] = [await driveRes.json(), await transitRes.json()];

		return {
			drive: {
				staticDuration: driveData[0].staticDuration,
				localizedValue: driveData[0].localizedValues.staticDuration.text
			},
			transit: {
				staticDuration: transitData[0].staticDuration,
				localizedValue: transitData[0].localizedValues.staticDuration.text
			}
		};
	}
};
