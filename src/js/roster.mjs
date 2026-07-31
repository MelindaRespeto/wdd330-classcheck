const API_URL = "https://randomuser.me/api/?results=15";
const ROSTER_KEY = "classcheck-roster";

export class Student {
    constructor(id, name, photo) {
        this.id = id;
        this.name = name;
        this.photo = photo;
    }
}

export async function fetchRoster() {
    // Return cached roster if we already fetched it
    const cached = localStorage.getItem(ROSTER_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const students = data.results.map((person, index) => {
            return new Student(
                `s${index + 1}`,
                `${person.name.first} ${person.name.last}`,
                person.picture.thumbnail
            );
        });

        localStorage.setItem(ROSTER_KEY, JSON.stringify(students));
        return students;
    } catch (error) {
        console.error("Failed to fetch roster:", error);
        return [];
    }
}