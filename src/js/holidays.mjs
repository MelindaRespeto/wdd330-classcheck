const HOLIDAY_API_URL = "https://date.nager.at/api/v3/PublicHolidays";

export async function isSchoolHoliday(dateString) {
    const year = dateString.split("-")[0];

    try {
        const response = await fetch(`${HOLIDAY_API_URL}/${year}/US`);
        const holidays = await response.json();

        const match = holidays.find((h) => h.date === dateString);
        return match ? match.localName : null;
    } catch (error) {
        console.error("Failed to check holidays:", error);
        return null;
    }
}