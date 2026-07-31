const API_URL = "https://randomuser.me/api/?results=15";
const ROSTER_KEY = "classcheck-roster";

export async function fetchRoster() {
    // Return cached roster if we already fetched it
    const cached = localStorage.getItem(ROSTER_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const students = data.results.map((person, index) => ({
            id: `s${index + 1}`,
            name: `${person.name.first} ${person.name.last}`,
            photo: person.picture.thumbnail,
        }));

        localStorage.setItem(ROSTER_KEY, JSON.stringify(students));
        return students;
    } catch (error) {
        console.error("Failed to fetch roster:", error);
        return [];
    }
}