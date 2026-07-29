const API_URL = "https://randomuser.me/api/?results=15";

export async function fetchRoster() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const students = data.results.map((person, index) => ({
            id: `s${index + 1}`,
            name: `${person.name.first} ${person.name.last}`,
            photo: person.picture.thumbnail,
        }));

        return students;
    } catch (error) {
        console.error("Failed to fetch roster:", error);
        return [];
    }
}