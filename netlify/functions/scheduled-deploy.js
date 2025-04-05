const fetch = require('node-fetch')
import { schedule } from '@netlify/functions'

const BUILD_HOOK =
	'https://api.netlify.com/build_hooks/67efb7134e320d83088ee000'

// From https://www.netlify.com/blog/how-to-schedule-deploys-with-netlify/
const postToBuildHook = async () => {
	console.log('Calling build hook at ', new Date())
	await fetch(BUILD_HOOK, { method: 'POST' }).then((response) => {
		console.log('Build hook response:', response.json())
	})
	return {
		statusCode: 200,
	}
}

// Trigger a build at 10am & 12pm on the 6th, 8th, & 10th of April every year.
// I will cancel the builds on the 6th once I have seen the cron job succeed — this date is purely for testing.
// CSS Naked Day runs from 10am 8th April to 12pm 10th April each year (UTC timezone).
// The cron schedule here will create twice as many builds as we need (10am & 12pm on both days),
// but at least it will cover the correct times.
const handler = schedule('0 10,12 6,8,10 4 *', postToBuildHook)

export { handler }
