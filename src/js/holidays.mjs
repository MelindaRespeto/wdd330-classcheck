// holidays.mjs
// Checks whether a given date is a US public holiday by calling the
// Nager.Date public holidays API. Used to show a "no school today"
// banner on the dashboard when applicable.

const HOLIDAY_API_URL = "https://date.nager.at/api/v3/PublicHolidays";

// Takes a date string like "2026-07-04" and returns the holiday's name
// if it's a recognized US public holiday, or null if it's a normal day
// (or if the API call fails, so the dashboard still works offline).
export async function isSchoolHoliday(dateString) {
    const year = dateString.split("-")[0];

    try {
        // Fetch the full list of US public holidays for that year
        const response = await fetch(`${HOLIDAY_API_URL}/${year}/US`);
        const holidays = await response.json();

        // Look for a holiday whose date matches the one we're checking
        const match = holidays.find((h) => h.date === dateString);
        return match ? match.localName : null;
    } catch (error) {
        // Fail gracefully — a broken API shouldn't break attendance tracking
        console.error("Failed to check holidays:", error);
        return null;
    }
}